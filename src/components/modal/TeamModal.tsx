import { Team } from '../../types/types';

interface TeamModalProps {
  team: Team;
  onClose: () => void;
  position: { x: number; y: number };
  onMoveConference?: (e: React.MouseEvent) => void;
  onEditDetails?: (e: React.MouseEvent) => void;
  onDeleteTeam?: () => void;
}

export function TeamModal({ team, position, onMoveConference, onEditDetails, onDeleteTeam }: TeamModalProps) {
  const handleMoveConference = (e: React.MouseEvent) => {
    e.stopPropagation();
    onMoveConference?.(e);
  };

  const handleEditDetails = (e: React.MouseEvent) => {
    onEditDetails?.(e);
  };

  const handleDeleteTeam = () => {
    onDeleteTeam?.();
  };

  return (
    <div 
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200"
      style={{ top: position.y, left: position.x }}
    >
      <div className="flex flex-col w-48">
        <button 
          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors rounded-t-lg"
          onClick={handleMoveConference}
        >
          Move Conferences
        </button>
        <button 
          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
          onClick={handleEditDetails}
        >
          Edit Details
        </button>
        <button 
          className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600 transition-colors rounded-b-lg"
          onClick={handleDeleteTeam}
        >
          Delete Team
        </button>
      </div>
    </div>
  );
}