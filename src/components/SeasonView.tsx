import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { ConferenceCard } from "./ConferenceCard";
import { TeamModal } from "./modal/TeamModal";
import { ConferenceMoveModal } from "./modal/ConferenceMoveModal";
import { useCallback, useEffect, useState } from "react";
import { Conference, Team } from "../types/types";
import { EditTeamDetailsModal } from "./modal/EditTeamDetailsModal";
import { AddTeamModal } from "./modal/AddTeamModal";
import { RestoreTeamsModal } from "./modal/RestoreTeamModal";
import { ExportJSONModal } from "./modal/ExportJsonModal";
import {
  fetchAll,
  autoSave,
  clearSavedData,
  hasSavedData,
} from "../data/storage";
import { YearChangeModal } from "./modal/YearChangeModal";
import { TeamCardOverlay } from "./TeamCardOverlay";

// Custom hook for team management
const useTeamManagement = (
  _conferences: Conference[],
  setConferences: React.Dispatch<React.SetStateAction<Conference[]>>
) => {
  const [deletedTeams, setDeletedTeams] = useState<Team[]>([]);

  const moveTeam = useCallback(
    (teamId: number, newConfId: number, insertIndex?: number) => {
      setConferences((prevConfs) => {
        const team = prevConfs
          .flatMap((conf) => conf.teams)
          .find((t) => t.team_id === teamId);
        if (!team) return prevConfs;

        return prevConfs.map((conf) => {
          if (conf.conf_id === newConfId) {
            const filteredTeams = conf.teams.filter(
              (t) => t.team_id !== teamId
            );
            const updatedTeam = { ...team, conf_id: newConfId };

            if (insertIndex !== undefined) {
              const newTeams = [...filteredTeams];
              newTeams.splice(insertIndex, 0, updatedTeam);
              return { ...conf, teams: newTeams };
            } else {
              return { ...conf, teams: [...filteredTeams, updatedTeam] };
            }
          } else {
            return {
              ...conf,
              teams: conf.teams.filter((t) => t.team_id !== teamId),
            };
          }
        });
      });
    },
    [setConferences]
  );

  const reorderTeam = useCallback(
    (confId: number, oldIndex: number, newIndex: number) => {
      setConferences((prevConfs) => {
        return prevConfs.map((conf) => {
          if (conf.conf_id === confId) {
            const newTeams = arrayMove(conf.teams, oldIndex, newIndex);
            return { ...conf, teams: newTeams };
          }
          return conf;
        });
      });
    },
    [setConferences]
  );

  const updateTeam = useCallback(
    (updatedTeam: Team) => {
      setDeletedTeams((prev) =>
        prev.filter((team) => team.team_id !== updatedTeam.team_id)
      );
      setConferences((prevConfs) =>
        prevConfs.map((conf) => {
          if (conf.conf_id === updatedTeam.conf_id) {
            const teamExists = conf.teams.some(
              (team) => team.team_id === updatedTeam.team_id
            );

            if (teamExists) {
              return {
                ...conf,
                teams: conf.teams.map((team) =>
                  team.team_id === updatedTeam.team_id ? updatedTeam : team
                ),
              };
            } else {
              return {
                ...conf,
                teams: [...conf.teams, updatedTeam],
              };
            }
          }
          return {
            ...conf,
            teams: conf.teams.filter(
              (team) => team.team_id !== updatedTeam.team_id
            ),
          };
        })
      );
    },
    [setConferences]
  );

  const deleteTeam = useCallback(
    (teamId: number) => {
      setConferences((prevConfs) => {
        const conf = prevConfs.find((c) =>
          c.teams.some((t) => t.team_id === teamId)
        );
        if (!conf) return prevConfs;

        const team = conf.teams.find((t) => t.team_id === teamId);
        if (team) {
          setDeletedTeams((prev) => {
            const exists = prev.some((t) => t.team_id === team.team_id);
            if (exists) return prev;
            return [...prev, { ...team, conf_id: -1 }];
          });
        }

        return prevConfs.map((c) => ({
          ...c,
          teams: c.teams.filter((t) => t.team_id !== teamId),
        }));
      });
    },
    [setConferences]
  );

  return { moveTeam, reorderTeam, updateTeam, deleteTeam, deletedTeams };
};

interface SeasonViewProps {
  initialYear: number;
  onBack: () => void;
}

export function SeasonView({ initialYear, onBack }: SeasonViewProps) {
  const [currentYear, setCurrentYear] = useState(initialYear);
  const [conferences, setConferences] = useState<Conference[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchAll(currentYear);
      setConferences(data);
    };
    loadData();
  }, [currentYear]);

  const { moveTeam, reorderTeam, updateTeam, deleteTeam, deletedTeams } =
    useTeamManagement(conferences, setConferences);

  // Auto-save to IndexedDB when conferences change
  useEffect(() => {
    if (conferences.length > 0) {
      autoSave(currentYear, conferences);
    }
  }, [conferences, currentYear]);

  // Track the active dragging team for the overlay
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);

  const [overConferenceId, setOverConferenceId] = useState<number | null>(null);
  const [overTeamId, setOverTeamId] = useState<number | null>(null);
  const [teamModal, setTeamModal] = useState<{
    team: Team;
    position: { x: number; y: number };
  } | null>(null);
  const [editModal, setEditModal] = useState<{
    team: Team;
    position: { x: number; y: number };
  } | null>(null);
  const [moveModal, setMoveModal] = useState<{
    team: Team;
    position: { x: number; y: number };
  } | null>(null);
  const [addTeamModal, setAddTeamModal] = useState(false);
  const [restoreTeamsModal, setRestoreTeamsModal] = useState(false);
  const [restoreToConfModal, setRestoreToConfModal] = useState<{
    team: Team;
  } | null>(null);
  const [exportModal, setExportModal] = useState(false);
  const [yearChangeModal, setYearChangeModal] = useState(false);
  const [hasModifications, setHasModifications] = useState(false);

  // Check if current year has saved modifications
  useEffect(() => {
    hasSavedData(currentYear).then(setHasModifications);
  }, [currentYear, conferences]);

  // DnD Kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const team = event.active.data.current?.team as Team | undefined;
    setActiveTeam(team ?? null);
  }, []);

  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { over } = event;
      if (over) {
        const overData = over.data.current;
        const overTeam = overData?.team as Team | undefined;

        if (overTeam) {
          const conf = conferences.find((c) =>
            c.teams.some((t) => t.team_id === overTeam.team_id)
          );
          setOverConferenceId(conf?.conf_id ?? null);
          setOverTeamId(overTeam.team_id);
        } else {
          const confId = overData?.conferenceId as number | undefined;
          setOverConferenceId(confId ?? null);
          setOverTeamId(null);
        }
      } else {
        setOverConferenceId(null);
        setOverTeamId(null);
      }
    },
    [conferences]
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      setOverConferenceId(null);
      setOverTeamId(null);
      setActiveTeam(null);

      if (!over) return;

      const activeData = active.data.current;
      const overData = over.data.current;
      const draggedTeam = activeData?.team as Team | undefined;

      if (!draggedTeam) return;

      const targetConfId = overData?.conferenceId as number | undefined;
      const overTeam = overData?.team as Team | undefined;

      if (overTeam) {
        const targetConf = conferences.find((c) =>
          c.teams.some((t) => t.team_id === overTeam.team_id)
        );
        if (!targetConf) return;

        if (draggedTeam.conf_id === targetConf.conf_id) {
          const oldIndex = targetConf.teams.findIndex(
            (t) => t.team_id === draggedTeam.team_id
          );
          const newIndex = targetConf.teams.findIndex(
            (t) => t.team_id === overTeam.team_id
          );
          if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            reorderTeam(targetConf.conf_id, oldIndex, newIndex);
          }
        } else {
          const insertIndex = targetConf.teams.findIndex(
            (t) => t.team_id === overTeam.team_id
          );
          moveTeam(draggedTeam.team_id, targetConf.conf_id, insertIndex);
        }
      } else if (targetConfId && draggedTeam.conf_id !== targetConfId) {
        moveTeam(draggedTeam.team_id, targetConfId);
      }
    },
    [moveTeam, reorderTeam, conferences]
  );

  useEffect(() => {
    if (!teamModal && !moveModal) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (
        teamModal &&
        !target.closest(".team-modal") &&
        !target.closest(".team-card")
      ) {
        setTeamModal(null);
      }

      if (
        moveModal &&
        !target.closest(".move-modal") &&
        !target.closest(".team-card")
      ) {
        setMoveModal(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [teamModal, moveModal]);

  const calculateModalPosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const modalWidth = 192;
    let x = rect.right + 8 + window.scrollX;

    if (x + modalWidth > window.innerWidth) {
      x = rect.left - modalWidth - 8 + window.scrollX;
    }

    return {
      x,
      y: rect.top + window.scrollY,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-700 text-white py-4 px-3 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm"
          >
            ← Back
          </button>
          <div className="flex items-end gap-2">
            <h1 className="text-2xl font-bold">Realignment Season</h1>
            <span className="text-sm opacity-80 mb-0.5">
              Year: {currentYear}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setYearChangeModal(true)}
            className="px-4 py-2 font-bold bg-white text-red-700 rounded hover:bg-gray-200 hover:text-red-500"
          >
            Change Year
          </button>
          <button
            onClick={() => setAddTeamModal(true)}
            className="px-4 py-2 font-bold bg-white text-red-700 rounded hover:bg-gray-200 hover:text-red-500"
          >
            Add New Team
          </button>
          <button
            onClick={() => setRestoreTeamsModal(true)}
            className="px-4 py-2 font-bold bg-white text-red-700 rounded hover:bg-gray-200 hover:text-red-500"
          >
            Restore Teams ({deletedTeams.length})
          </button>
          <button
            onClick={() => setExportModal(true)}
            className="px-4 py-2 font-bold bg-white text-red-700 rounded hover:bg-gray-200 hover:text-red-500"
          >
            Export to JSON
          </button>
          {hasModifications && (
            <button
              onClick={async () => {
                if (
                  confirm(
                    `Reset ${currentYear} to original data? Your changes will be lost.`
                  )
                ) {
                  await clearSavedData(currentYear);
                  const data = await fetchAll(currentYear);
                  setConferences(data);
                  setHasModifications(false);
                }
              }}
              className="px-4 py-2 font-bold bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Reset to Original
            </button>
          )}
        </div>
      </header>

      <main className="max-w-fit mx-auto py-4 px-2">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <div className="flex flex-wrap justify-center gap-4">
            {conferences.map((conference) => (
              <ConferenceCard
                key={conference.conf_id}
                conference={conference}
                teams={conference.teams}
                isOver={overConferenceId === conference.conf_id}
                activeTeam={activeTeam}
                overTeamId={overTeamId}
                onTeamClick={(e, team) => {
                  setMoveModal(null);
                  setTeamModal({ team, position: calculateModalPosition(e) });
                }}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTeam ? <TeamCardOverlay team={activeTeam} /> : null}
          </DragOverlay>
        </DndContext>
      </main>

      {teamModal && (
        <TeamModal
          team={teamModal.team}
          position={teamModal.position}
          onClose={() => setTeamModal(null)}
          onMoveConference={() => {
            setTeamModal(null);
            setMoveModal({
              team: teamModal.team,
              position: teamModal.position,
            });
          }}
          onEditDetails={() => {
            setTeamModal(null);
            setEditModal(teamModal);
          }}
          onDeleteTeam={() => {
            deleteTeam(teamModal.team.team_id);
            setTeamModal(null);
          }}
        />
      )}

      {moveModal && (
        <ConferenceMoveModal
          team={moveModal.team}
          conferences={conferences}
          position={moveModal.position}
          onMove={(confId) => {
            moveTeam(moveModal.team.team_id, confId);
            setMoveModal(null);
          }}
          onClose={() => setMoveModal(null)}
        />
      )}

      {editModal && (
        <EditTeamDetailsModal
          team={editModal.team}
          position={editModal.position}
          conferences={conferences.map((c) => ({
            id: c.conf_id,
            name: c.conf_name,
          }))}
          onSave={(updatedTeam) => {
            updateTeam(updatedTeam);
            setEditModal(null);
          }}
          onClose={() => setEditModal(null)}
        />
      )}

      {yearChangeModal && (
        <YearChangeModal
          currentYear={currentYear}
          onClose={() => setYearChangeModal(false)}
          onSubmit={(year) => {
            setCurrentYear(year);
            setYearChangeModal(false);
          }}
        />
      )}

      {addTeamModal && (
        <AddTeamModal
          conferences={conferences.map((c) => ({
            id: c.conf_id,
            name: c.conf_name,
          }))}
          teams={conferences.flatMap((c) => c.teams)}
          onSave={(newTeam) => {
            updateTeam(newTeam);
            setAddTeamModal(false);
          }}
          onClose={() => setAddTeamModal(false)}
        />
      )}

      {restoreTeamsModal && (
        <RestoreTeamsModal
          deletedTeams={deletedTeams}
          onRestore={(team) => {
            setRestoreToConfModal({ team });
            setRestoreTeamsModal(false);
          }}
          onClose={() => setRestoreTeamsModal(false)}
        />
      )}

      {restoreToConfModal && (
        <ConferenceMoveModal
          team={restoreToConfModal.team}
          conferences={conferences}
          position={{
            x: window.innerWidth / 2 - 100,
            y: window.innerHeight / 2 - 100,
          }}
          onMove={(confId) => {
            updateTeam({ ...restoreToConfModal.team, conf_id: confId });
            setRestoreToConfModal(null);
          }}
          onClose={() => setRestoreToConfModal(null)}
          isFromRestore={true}
        />
      )}

      {exportModal && (
        <ExportJSONModal
          conferences={conferences}
          onClose={() => setExportModal(false)}
        />
      )}

      <footer className="bg-red-700 text-white py-4 px-3 shadow-lg">
        <p className="text-base text-right">made by glenn jenkins</p>
      </footer>
    </div>
  );
}
