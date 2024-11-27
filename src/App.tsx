import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ConferenceCard } from './components/ConferenceCard';
import { Popup } from './components/Popup';
import { EditTeamPopup } from './components/EditTeamPopup';
import conferencesData from './data/conferences.json';
import teamsData from './data/teams.json';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ConferenceWithTeams, Team } from './types/types';

export function App() {
  const organizedConferences = conferencesData.map(conference => ({
    ...conference,
    teams: teamsData.filter(team => team.conference === conference.id)
  }));

  const conferencesRef = useRef<ConferenceWithTeams[]>(organizedConferences);
  const [, setRerender] = useState(false);
  const [highlightedConference, setHighlightedConference] = useState<number | null>(null);
  const [popup, setPopup] = useState<{ team: Team; position: { x: number; y: number } } | null>(null);
  const [editPopup, setEditPopup] = useState<{ team: Team; position: { x: number; y: number } } | null>(null);

  const handleDrop = useCallback(({ source, location }) => {
    if (location.current.dropTargets.length !== 1) {
      return;
    }
    if (source.data.type === "team") {
      // get teamId and conferenceId for the conference team is moved to
      const teamId = source.data.team.id;
      const newConfId = location.previous.dropTargets[0].data.teams[0].conference;

      // get the full objects for the team, new conference, and old conference
      const team = conferencesRef.current
        .flatMap(conference => conference.teams)
        .find(team => team.id === teamId);
      if (!team) {
        return;
      }
      
      // Remove team from old conference
      const oldConf = conferencesRef.current[team.conference - 1];
      oldConf.teams = oldConf.teams.filter(team => team.id !== teamId);
      conferencesRef.current[team.conference - 1] = oldConf;

      // Add team to new conference
      team.conference = newConfId;
      const newConf = conferencesRef.current[newConfId - 1];
      newConf.teams.push(team);
      newConf.teams.sort((a, b) => a.id - b.id);
      conferencesRef.current[newConfId - 1] = newConf;
      
      setRerender(prev => !prev);
    }
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    });
  }, [handleDrop]);

  const handleDragStart = (conferenceId: number) => {
    setHighlightedConference(conferenceId);
  };

  const handleDragEnd = () => {
    setHighlightedConference(null);
  };

  const handleTeamClick = (e: React.MouseEvent, team: Team) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setPopup({
      team,
      position: {
        x: rect.right + 8,
        y: rect.top
      }
    });
  };

  const handleMoveConference = () => {
    // TODO
    setPopup(null);
  };

  const handleEditDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (popup) {
      const newPopup = {
        team: popup.team,
        position: popup.position
      };
      setEditPopup(newPopup);
      setPopup(null);
    }
  };

  const handleDeleteTeam = (teamId: number, conferenceId: number) => {
    const conference = conferencesRef.current.find(conf => conf.id === conferenceId);
    if (conference) {
      conference.teams = conference.teams.filter(team => team.id !== teamId);
      setRerender(prev => !prev);
    }
    setPopup(null);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setPopup(null);
      setEditPopup(null);
    };
    if (popup || editPopup) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [popup, editPopup]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-700 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-center">
          <h1 className="text-3xl font-bold">Realignment SZN</h1>
        </div>
      </header>

      <main className="max-w-fit mx-auto py-4 px-2">
        <div className="flex flex-wrap justify-center gap-4">
          {conferencesRef.current.map((conference) => (
            <ConferenceCard 
              key={conference.id}
              conferenceId={conference.id} 
              teams={conference.teams}
              highlighted={highlightedConference === conference.id}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onTeamClick={handleTeamClick}
            />
          ))}
        </div>
      </main>

      {popup && (
        <Popup 
          team={popup.team}
          position={popup.position}
          onClose={() => setPopup(null)}
          onMoveConference={handleMoveConference}
          onEditDetails={(e) => handleEditDetails(e)}
          onDeleteTeam={() => handleDeleteTeam(popup.team.id, popup.team.conference)}
        />
      )}

      {editPopup && (
        <EditTeamPopup 
          team={editPopup.team}
          position={editPopup.position}
          onClose={() => setEditPopup(null)}
        />
      )}

      <footer className="bg-red-700 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-end">
          <p className="text-lg">made by glenn jenkins</p>
        </div>
      </footer>
    </div>
  );
}

export default App;