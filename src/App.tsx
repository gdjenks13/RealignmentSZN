import { ConferenceCard } from './components/ConferenceCard';
import conferencesData from './data/conferences.json';

export function App() {
  const conferences = conferencesData;

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
            <ConferenceCard key={conference.id} conferenceId={conference.id} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;