import { monitorForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { ConferenceCard } from './components/ConferenceCard';
import conferencesData from './data/conferences.json';
import teamsData from './data/teams.json';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ConferenceWithTeams } from './types/types';

export function App() {
  const organizedConferences = conferencesData.map(conference => ({
    ...conference,
    teams: teamsData.filter(team => team.conference === conference.id)
  }));

  const conferencesRef = useRef<ConferenceWithTeams[]>(organizedConferences);
  const [, setRerender] = useState(false);
  const [highlightedConference, setHighlightedConference] = useState<number | null>(null);

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