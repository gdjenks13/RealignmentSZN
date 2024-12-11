import { Conference, Team } from '../../types/types';

interface ConferenceMoveModalProps {
  team: Team;
  conferences: Conference[];
  position: { x: number; y: number };
  onMove: (conferenceId: number) => void;
  onClose: () => void;
  isFromRestore?: boolean;
}

export function ConferenceMoveModal({ 
  team, 
  conferences, 
  position, 
  onMove, 
  onClose,
  isFromRestore = false 
}: ConferenceMoveModalProps) {
  const availableConferences = conferences.filter(conf => conf.id !== team.conference);

  if (isFromRestore) {
    return (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-lg p-6 max-w-md w-full"
          onClick={e => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold mb-4">Select New Conference</h2>
          <div className="space-y-2">
            {availableConferences.map(conference => (
              <div 
                key={conference.id}
                className="flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer"
                onClick={() => onMove(conference.id)}
              >
                <span>{conference.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Original dropdown style for non-restore case
  return (
    <div 
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200"
      style={{ top: position.y, left: position.x }}
    >
      <div className="flex flex-col w-48">
        <div className="px-4 py-2 bg-gray-50 font-medium border-b">
          Select Conference
        </div>
        {availableConferences.map(conference => (
          <button
            key={conference.id}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
            onClick={() => onMove(conference.id)}
          >
            {conference.name}
          </button>
        ))}
      </div>
    </div>
  );
}