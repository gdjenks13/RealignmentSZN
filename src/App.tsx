import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ConferenceCard } from './components/ConferenceCard';
import { TeamModal } from './components/modal/TeamModal';
import { ConferenceMoveModal } from './components/modal/ConferenceMoveModal';
import conferencesData from './data/conferences.json';
import teamsData from './data/teams.json';
import { useCallback, useEffect, useState } from 'react';
import { ConferenceWithTeams, Team } from './types/types';
import { EditTeamDetailsModal } from './components/modal/EditTeamDetailsModal';

// Custom hook for team management
const useTeamManagement = (initialConferences: ConferenceWithTeams[]) => {
  const [conferences, setConferences] = useState(initialConferences);
  const [, setDeletedTeams] = useState<Team[]>([]);

  const moveTeam = (teamId: number, newConfId: number) => {
    setConferences(prevConfs => {
      const team = prevConfs.flatMap(conf => conf.teams).find(t => t.id === teamId);
      if (!team) return prevConfs;

      return prevConfs.map(conf => ({
        ...conf,
        teams: conf.id === newConfId
          ? [...conf.teams.filter(t => t.id !== teamId), { ...team, conference: newConfId }].sort((a, b) => a.id - b.id)
          : conf.teams.filter(t => t.id !== teamId)
      }));
    });
  };

  const updateTeam = (updatedTeam: Team) => {
    setConferences(prevConfs => 
      prevConfs.map(conf => ({
        ...conf,
        teams: conf.teams.map(team => 
          team.id === updatedTeam.id ? updatedTeam : team
        )
      }))
    );
  };

  const deleteTeam = (teamId: number) => {
    setConferences(prevConfs => {
      const conf = prevConfs.find(c => c.teams.some(t => t.id === teamId));
      if (!conf) return prevConfs;

      const team = conf.teams.find(t => t.id === teamId);
      if (team) {
        setDeletedTeams(prev => [...prev, { ...team, conference: -1 }]);
      }

      return prevConfs.map(c => ({
        ...c,
        teams: c.teams.filter(t => t.id !== teamId)
      }));
    });
  };

  return { conferences, moveTeam, updateTeam, deleteTeam };
};

export function App() {
  const { conferences, moveTeam, updateTeam, deleteTeam } = useTeamManagement(
    conferencesData.map(conference => ({
      ...conference,
      teams: teamsData.filter(team => team.conference === conference.id)
    }))
  );

  const [highlightedConference, setHighlightedConference] = useState<number | null>(null);
  const [teamModal, setTeamModal] = useState<{ team: Team; position: { x: number; y: number } } | null>(null);
  const [editModal, setEditModal] = useState<{ team: Team; position: { x: number; y: number } } | null>(null);
  const [moveModal, setMoveModal] = useState<{ team: Team; position: { x: number; y: number } } | null>(null);

  const handleDrop = useCallback(({ source, location }) => {
    if (!location.current.dropTargets.length || source.data.type !== "team") return;
    const newConfId = location.current.dropTargets[0].data.conferenceId;
    moveTeam(source.data.team.id, newConfId);
  }, [moveTeam]);

  useEffect(() => {
    return monitorForElements({ onDrop: handleDrop });
  }, [handleDrop]);

  const calculateModalPosition = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const modalWidth = 192;
    let x = rect.right + 8 + window.scrollX;
    
    if (x + modalWidth > window.innerWidth) {
      x = rect.left - modalWidth - 8 + window.scrollX;
    }

    return {
      x,
      y: rect.top + window.scrollY
    };
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-700 text-white py-6 px-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Realignment SZN</h1>
      </header>

      <main className="max-w-fit mx-auto py-4 px-2">
        <div className="flex flex-wrap justify-center gap-4">
          {conferences.map(conference => (
            <ConferenceCard 
              key={conference.id}
              conferenceId={conference.id} 
              teams={conference.teams}
              highlighted={highlightedConference === conference.id}
              onDragStart={() => setHighlightedConference(conference.id)}
              onDragEnd={() => setHighlightedConference(null)}
              onTeamClick={(e, team) => setTeamModal({ team, position: calculateModalPosition(e) })}
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
            setMoveModal(teamModal);
          }}
          onEditDetails={() => {
            setTeamModal(null);
            setEditModal(teamModal);
          }}
          onDeleteTeam={() => {
            deleteTeam(teamModal.team.id);
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
            moveTeam(moveModal.team.id, confId);
            setMoveModal(null);
          }}
          onClose={() => setMoveModal(null)}
        />
      )}

      {editModal && (
        <EditTeamDetailsModal
          team={editModal.team}
          position={editModal.position}
          onSave={(updatedTeam) => {
            updateTeam(updatedTeam);
            setEditModal(null);
          }}
          onClose={() => setEditModal(null)}
        />
      )}

      <footer className="bg-red-700 text-white py-6 px-4 shadow-lg">
        <p className="text-lg text-right">made by glenn jenkins</p>
      </footer>
    </div>
  );
}