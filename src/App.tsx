import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ConferenceCard } from './components/ConferenceCard';
import conferencesData from './data/conferences.json';
import teamsData from './data/teams.json';
import { useCallback, useEffect, useRef, useState } from 'react';

export function App() {
  const conferences = conferencesData;
  const teamsRef = useRef(teamsData);
  const [, setRerender] = useState(false);
  const [highlightedConference, setHighlightedConference] = useState<number | null>(null);

  const handleDrop = useCallback(({ source, location }) => {
    if (location.current.dropTargets.length !== 1) {
      return;
    }
    if (source.data.type === "team") {
      const teamId = source.data.team.id;
      const newConf = location.previous.dropTargets[0].data.teams[0].conference;
      const updatedTeams = teamsRef.current.map((team) => {
        if (team.id === teamId) {
          return { ...team, conference: newConf };
        }
        return team;
      });

      teamsRef.current = updatedTeams;
      setRerender(prev => !prev);
    }
    
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop: handleDrop,
    });
  }, [handleDrop]);

  const handleDragStart = (conference: number) => {
    setHighlightedConference(conference);
  };

  const handleDragEnd = () => {
    setHighlightedConference(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-red-700 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-center">
          <h1 className="text-3xl font-bold">Realignment SZN</h1>
        </div>
      </header>

      <main className="max-w-fit mx-auto py-4 px-2">
        <div className="flex flex-wrap justify-center gap-4">
          {conferences.map((conference) => (
            <ConferenceCard 
              key={conference.id}
              conferenceId={conference.id} 
              teams={teamsRef.current.filter(team => team.conference === conference.id)} 
              highlighted={highlightedConference === conference.id}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </div>
      </main>

      <footer className="bg-red-700 text-white py-6 px-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-end">
          <p className="text-lg">made by glenn jenkins</p>
        </div>
      </footer>
    </div>
  );
}

export default App;