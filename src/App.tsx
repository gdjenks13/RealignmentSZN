import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useAtom } from 'jotai';
import { conferencesAtom } from './store/conferences';
import { ConferenceCard } from './components/ConferenceCard';

export function App() {
  const [conferences] = useAtom(conferencesAtom);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-900 text-white py-6 px-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <h1 className="text-3xl font-bold">Realignment SZN</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-8 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conferences.map((conference) => (
              <ConferenceCard
                key={conference.id}
                conference={conference}
              />
            ))}
          </div>
        </main>
      </div>
    </DndProvider>
  );
}

export default App;