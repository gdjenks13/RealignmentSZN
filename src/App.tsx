import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ConferenceCard } from './components/ConferenceCard';
import conferencesData from './data/conferences.json';
import teamsData from './data/teams.json';
import { useCallback, useEffect, useRef, useState } from 'react';

export function App() {
  const conferences = conferencesData;
  const teamsRef = useRef(teamsData);
  const [, setRerender] = useState(false);

  const handleDrop = useCallback(({ source, location }) => {
    if (location.current.dropTargets.length !== 1) {
      return;
    }
    if (source.data.type === "team") {
      const teamId = source.data.team.teamId;
      const newConf = location.previous.dropTargets[0].data.teams[0].conference;
      const updatedTeams = teamsRef.current.map((team) => {
        if (team.teamId === teamId) {
          return { ...team, conference: newConf };
        }
        return team;
      });

      teamsRef.current = updatedTeams;
      console.log(teamsRef.current.filter(team => team.conference === newConf));
      setRerender(prev => !prev);
    }
    
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    });
  }, [handleDrop]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-blue-900 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <h1 className="text-3xl font-bold">Realignment SZN</h1>
        </div>
      </header>

      <main className="max-w-fit mx-auto py-4 px-2">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {conferences.map((conference) => (
            <ConferenceCard 
              key={conference.id}
              conferenceId={conference.id} 
              teams={teamsRef.current.filter(team => team.conference === conference.id)} 
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;