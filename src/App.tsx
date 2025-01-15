import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { ConferenceCard } from "./components/ConferenceCard";
import { TeamModal } from "./components/modal/TeamModal";
import { ConferenceMoveModal } from "./components/modal/ConferenceMoveModal";
import { useCallback, useEffect, useState } from "react";
import { Conference, Team } from "./types/types";
import { EditTeamDetailsModal } from "./components/modal/EditTeamDetailsModal";
import { AddTeamModal } from "./components/modal/AddTeamModal";
import { RestoreTeamsModal } from "./components/modal/RestoreTeamModal";
import { ExportJSONModal } from "./components/modal/ExportJsonModal";
import { fetchAll } from "./data/supabase_setup";

const initialConferences: Conference[] = await fetchAll(2024); // This is a test

// Custom hook for team management
const useTeamManagement = (initialConferences: Conference[]) => {
  const [conferences, setConferences] = useState(initialConferences);
  const [deletedTeams, setDeletedTeams] = useState<Team[]>([]);

  const moveTeam = (teamId: number, newConfId: number) => {
    setConferences((prevConfs) => {
      const team = prevConfs
        .flatMap((conf) => conf.teams)
        .find((t) => t.team_id === teamId);
      if (!team) return prevConfs;

      return prevConfs.map((conf) => ({
        ...conf,
        teams:
          conf.conf_id === newConfId
            ? [
                ...conf.teams.filter((t) => t.team_id !== teamId),
                { ...team, conference: newConfId },
              ].sort((a, b) => a.team_id - b.team_id)
            : conf.teams.filter((t) => t.team_id !== teamId),
      }));
    });
  };

  const updateTeam = (updatedTeam: Team) => {
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
              teams: [...conf.teams, updatedTeam].sort((a, b) => a.team_id - b.team_id),
            };
          }
        }
        return {
          ...conf,
          teams: conf.teams.filter((team) => team.team_id !== updatedTeam.team_id),
        };
      })
    );
  };

  const deleteTeam = (teamId: number) => {
    setConferences((prevConfs) => {
      const conf = prevConfs.find((c) => c.teams.some((t) => t.team_id === teamId));
      if (!conf) return prevConfs;

      const team = conf.teams.find((t) => t.team_id === teamId);
      if (team) {
        setDeletedTeams((prev) => {
          const exists = prev.some((t) => t.team_id === team.team_id);
          if (exists) return prev;
          return [...prev, { ...team, conference: -1 }];
        });
      }

      return prevConfs.map((c) => ({
        ...c,
        teams: c.teams.filter((t) => t.team_id !== teamId),
      }));
    });
  };

  return { conferences, moveTeam, updateTeam, deleteTeam, deletedTeams };
};

export function App() {
  const { conferences, moveTeam, updateTeam, deleteTeam, deletedTeams } =
    useTeamManagement(initialConferences);

  const [highlightedConference, setHighlightedConference] = useState<
    number | null
  >(null);
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

  const handleDrop = useCallback(
    ({ source, location }) => {
      if (!location.current.dropTargets.length || source.data.type !== "team")
        return;
      const newConfId = location.current.dropTargets[0].data.conferenceId;
      moveTeam(source.data.team.team_id, newConfId);
    },
    [moveTeam]
  );

  useEffect(() => {
    return monitorForElements({ onDrop: handleDrop });
  }, [handleDrop]);

  useEffect(() => {
    // Only run if either modal is open
    if (!teamModal && !moveModal) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Handle team modal
      if (
        teamModal &&
        !target.closest(".team-modal") &&
        !target.closest(".team-card")
      ) {
        setTeamModal(null);
      }

      // Handle move modal
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
        <h1 className="text-3xl font-bold">Realignment Season</h1>
        <div className="flex gap-2">
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
        </div>
      </header>

      <main className="max-w-fit mx-auto py-4 px-2">
        <div className="flex flex-wrap justify-center gap-4">
          {conferences.map((conference) => (
            <ConferenceCard
              key={conference.conf_id}
              conference={conference}
              teams={conference.teams}
              highlighted={highlightedConference === conference.conf_id}
              onDragStart={() => setHighlightedConference(conference.conf_id)}
              onDragEnd={() => setHighlightedConference(null)}
              onTeamClick={(e, team) => {
                setMoveModal(null); // Close ConferenceMoveModal first
                setTeamModal({ team, position: calculateModalPosition(e) });
              }}
            />
          ))}
        </div>
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
              position: teamModal.position, // Reuse the same position
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
          conferences={conferences.map((c) => ({ id: c.conf_id, name: c.conf_name }))}
          onSave={(updatedTeam) => {
            updateTeam(updatedTeam);
            setEditModal(null);
          }}
          onClose={() => setEditModal(null)}
        />
      )}

      {addTeamModal && (
        <AddTeamModal
          conferences={conferences.map((c) => ({ id: c.conf_id, name: c.conf_name }))}
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
