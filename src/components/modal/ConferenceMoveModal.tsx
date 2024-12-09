import { Conference, Team } from '../../types/types';

interface ConferenceMoveModalProps {
  team: Team;
  conferences: Conference[];
  position: { x: number; y: number };
  onMove: (conferenceId: number) => void;
  onClose: () => void;
}

export function ConferenceMoveModal({ team, conferences, position, onMove, onClose }: ConferenceMoveModalProps) {
  const availableConferences = conferences.filter(conf => conf.id !== team.conference);

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