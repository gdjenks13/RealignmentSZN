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
import { useCallback, useEffect, useState } from "react";
import { Conference, Team } from "../types/types";
import { ConferenceCard } from "./ConferenceCard";
import { TeamPool } from "./TeamPool";
import { TeamCardOverlay } from "./TeamCardOverlay";
import { TeamPoolItemOverlay } from "./TeamPoolItemOverlay";
import { AddConferenceModal } from "./modal/AddConferenceModal";
import { TeamModal } from "./modal/TeamModal";
import { ConferenceMoveModal } from "./modal/ConferenceMoveModal";
import { EditTeamDetailsModal } from "./modal/EditTeamDetailsModal";
import { ExportJSONModal } from "./modal/ExportJsonModal";
import {
  getAllConferences,
  getAllTeams,
  saveCustomConferences,
  loadCustomConferences,
  clearCustomConferences,
  hasCustomConferences,
  RawConference,
  RawTeam,
} from "../data/storage";

interface CustomConferencesViewProps {
  onBack: () => void;
}

export function CustomConferencesView({ onBack }: CustomConferencesViewProps) {
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [allTeams, setAllTeams] = useState<RawTeam[]>([]);
  const [allConferencesRaw, setAllConferencesRaw] = useState<RawConference[]>(
    []
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [hasModifications, setHasModifications] = useState(false);

  // Modals
  const [addConferenceModal, setAddConferenceModal] = useState(false);
  const [teamModal, setTeamModal] = useState<{
    team: Team;
    position: { x: number; y: number };
  } | null>(null);
  const [moveModal, setMoveModal] = useState<{
    team: Team;
    position: { x: number; y: number };
  } | null>(null);
  const [editModal, setEditModal] = useState<{
    team: Team;
    position: { x: number; y: number };
  } | null>(null);
  const [exportModal, setExportModal] = useState(false);

  // Drag state
  const [activeTeam, setActiveTeam] = useState<Team | null>(null);
  const [activePoolTeam, setActivePoolTeam] = useState<RawTeam | null>(null);
  const [overConferenceId, setOverConferenceId] = useState<number | null>(null);
  const [overTeamId, setOverTeamId] = useState<number | null>(null);

  // Load master data and any saved custom conferences
  useEffect(() => {
    const loadData = async () => {
      setAllTeams(getAllTeams());
      setAllConferencesRaw(getAllConferences());

      // Try to load saved custom conferences
      const saved = await loadCustomConferences();
      if (saved) {
        setConferences(saved);
      }
    };
    loadData();
  }, []);

  // Check for modifications
  useEffect(() => {
    hasCustomConferences().then(setHasModifications);
  }, [conferences]);

  // Auto-save when conferences change
  useEffect(() => {
    if (conferences.length > 0) {
      saveCustomConferences(conferences);
    }
  }, [conferences]);

  // Get set of assigned team IDs
  const assignedTeamIds = new Set(
    conferences.flatMap((c) => c.teams.map((t) => t.team_id))
  );

  // Get set of used conference IDs
  const usedConferenceIds = new Set(conferences.map((c) => c.conf_id));

  // DnD Kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const data = event.active.data.current;
    if (data?.type === "pool-team") {
      setActivePoolTeam(data.team as RawTeam);
      setActiveTeam(null);
    } else if (data?.type === "team") {
      setActiveTeam(data.team as Team);
      setActivePoolTeam(null);
    }
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
      setActivePoolTeam(null);

      if (!over) return;

      const activeData = active.data.current;
      const overData = over.data.current;

      // Handle pool team drop
      if (activeData?.type === "pool-team") {
        const poolTeam = activeData.team as RawTeam;
        const targetConfId = overData?.conferenceId as number | undefined;
        const overTeam = overData?.team as Team | undefined;

        let targetConf: Conference | undefined;
        let insertIndex: number | undefined;

        if (overTeam) {
          targetConf = conferences.find((c) =>
            c.teams.some((t) => t.team_id === overTeam.team_id)
          );
          if (targetConf) {
            insertIndex = targetConf.teams.findIndex(
              (t) => t.team_id === overTeam.team_id
            );
          }
        } else if (targetConfId) {
          targetConf = conferences.find((c) => c.conf_id === targetConfId);
        }

        if (targetConf) {
          const newTeam: Team = {
            ...poolTeam,
            conf_id: targetConf.conf_id,
          };

          setConferences((prev) =>
            prev.map((c) => {
              if (c.conf_id === targetConf!.conf_id) {
                const teams =
                  insertIndex !== undefined
                    ? [
                        ...c.teams.slice(0, insertIndex),
                        newTeam,
                        ...c.teams.slice(insertIndex),
                      ]
                    : [...c.teams, newTeam];
                return { ...c, teams };
              }
              return c;
            })
          );
        }
        return;
      }

      // Handle existing team reorder/move
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
          // Same conference - reorder
          const oldIndex = targetConf.teams.findIndex(
            (t) => t.team_id === draggedTeam.team_id
          );
          const newIndex = targetConf.teams.findIndex(
            (t) => t.team_id === overTeam.team_id
          );
          if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
            setConferences((prev) =>
              prev.map((c) => {
                if (c.conf_id === targetConf.conf_id) {
                  return {
                    ...c,
                    teams: arrayMove(c.teams, oldIndex, newIndex),
                  };
                }
                return c;
              })
            );
          }
        } else {
          // Different conference - move
          const insertIndex = targetConf.teams.findIndex(
            (t) => t.team_id === overTeam.team_id
          );
          moveTeam(draggedTeam.team_id, targetConf.conf_id, insertIndex);
        }
      } else if (targetConfId && draggedTeam.conf_id !== targetConfId) {
        moveTeam(draggedTeam.team_id, targetConfId);
      }
    },
    [conferences]
  );

  const moveTeam = (
    teamId: number,
    newConfId: number,
    insertIndex?: number
  ) => {
    setConferences((prev) => {
      const team = prev
        .flatMap((c) => c.teams)
        .find((t) => t.team_id === teamId);
      if (!team) return prev;

      return prev.map((conf) => {
        if (conf.conf_id === newConfId) {
          const filteredTeams = conf.teams.filter((t) => t.team_id !== teamId);
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
  };

  const handleAddExistingConference = (rawConf: RawConference) => {
    const newConf: Conference = {
      ...rawConf,
      teams: [],
    };
    setConferences((prev) => [...prev, newConf]);
    setAddConferenceModal(false);
  };

  const handleCreateNewConference = (confData: Omit<Conference, "teams">) => {
    const newConf: Conference = {
      ...confData,
      teams: [],
    };
    setConferences((prev) => [...prev, newConf]);
    setAddConferenceModal(false);
  };

  const handleRemoveConference = (confId: number) => {
    setConferences((prev) => prev.filter((c) => c.conf_id !== confId));
  };

  const handleRemoveTeamFromConference = (teamId: number) => {
    setConferences((prev) =>
      prev.map((c) => ({
        ...c,
        teams: c.teams.filter((t) => t.team_id !== teamId),
      }))
    );
  };

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

  // Convert pool teams to Team type for the pool display
  const poolTeams: Team[] = allTeams.map((t) => ({
    ...t,
    conf_id: -1,
  }));

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-red-700 text-white py-4 px-3 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="px-3 py-1 bg-white/20 hover:bg-white/30 rounded text-sm"
          >
            ← Back
          </button>
          <h1 className="text-2xl font-bold">Custom Conferences</h1>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setAddConferenceModal(true)}
            className="px-4 py-2 font-bold bg-white text-red-700 rounded hover:bg-gray-200"
          >
            Add Conference
          </button>
          <button
            onClick={() => setExportModal(true)}
            className="px-4 py-2 font-bold bg-white text-red-700 rounded hover:bg-gray-200"
          >
            Export to JSON
          </button>
          {hasModifications && (
            <button
              onClick={async () => {
                if (
                  confirm(
                    "Clear all custom conferences? This cannot be undone."
                  )
                ) {
                  await clearCustomConferences();
                  setConferences([]);
                  setHasModifications(false);
                }
              }}
              className="px-4 py-2 font-bold bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Clear All
            </button>
          )}
        </div>
      </header>

      <main className="flex-1 flex">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          {/* Team Pool Sidebar */}
          <aside className="w-1/4 p-4 bg-gray-100 border-r border-gray-200 overflow-y-auto">
            <TeamPool
              teams={poolTeams}
              assignedTeamIds={assignedTeamIds}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </aside>

          {/* Conferences Area */}
          <div className="flex-1 p-4 overflow-y-auto">
            {conferences.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg
                  className="w-16 h-16 mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                <p className="text-lg font-medium">No conferences yet</p>
                <p className="text-sm mt-1">
                  Click "Add Conference" to get started
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-4">
                {conferences.map((conference) => (
                  <div key={conference.conf_id} className="relative">
                    <button
                      onClick={() => {
                        if (
                          conference.teams.length === 0 ||
                          confirm(
                            `Remove ${conference.conf_name}? Teams will return to the pool.`
                          )
                        ) {
                          handleRemoveConference(conference.conf_id);
                        }
                      }}
                      className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 shadow"
                      title="Remove conference"
                    >
                      ×
                    </button>
                    <ConferenceCard
                      conference={conference}
                      teams={conference.teams}
                      isOver={overConferenceId === conference.conf_id}
                      activeTeam={
                        activePoolTeam
                          ? { ...activePoolTeam, conf_id: -1 }
                          : activeTeam
                      }
                      overTeamId={overTeamId}
                      onTeamClick={(e, team) => {
                        setMoveModal(null);
                        setTeamModal({
                          team,
                          position: calculateModalPosition(e),
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <DragOverlay>
            {activeTeam ? (
              <TeamCardOverlay team={activeTeam} />
            ) : activePoolTeam ? (
              <TeamPoolItemOverlay team={{ ...activePoolTeam, conf_id: -1 }} />
            ) : null}
          </DragOverlay>
        </DndContext>
      </main>

      {/* Modals */}
      {addConferenceModal && (
        <AddConferenceModal
          existingConferences={allConferencesRaw}
          usedConferenceIds={usedConferenceIds}
          onAddExisting={handleAddExistingConference}
          onCreateNew={handleCreateNewConference}
          onClose={() => setAddConferenceModal(false)}
        />
      )}

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
            handleRemoveTeamFromConference(teamModal.team.team_id);
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
            setConferences((prev) =>
              prev.map((c) => {
                if (c.conf_id === updatedTeam.conf_id) {
                  return {
                    ...c,
                    teams: c.teams.map((t) =>
                      t.team_id === updatedTeam.team_id ? updatedTeam : t
                    ),
                  };
                }
                // Handle team moving to different conference
                return {
                  ...c,
                  teams: c.teams.filter(
                    (t) => t.team_id !== updatedTeam.team_id
                  ),
                };
              })
            );
            setEditModal(null);
          }}
          onClose={() => setEditModal(null)}
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
