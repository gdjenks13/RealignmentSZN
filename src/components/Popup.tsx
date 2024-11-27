import { Team } from '../types/types';
import { useEffect, useState } from 'react';

interface PopupProps {
  team: Team;
  onClose: () => void;
  position: { x: number; y: number };
  onMoveConference?: (e: React.MouseEvent) => void;
  onEditDetails?: (e: React.MouseEvent) => void;
  onDeleteTeam?: () => void;
}

export function Popup({ team, position, onMoveConference, onEditDetails, onDeleteTeam }: PopupProps) {
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const popupWidth = 192;
    const popupHeight = 120;
    
    let adjustedX = position.x;
    let adjustedY = position.y;
    
    if (adjustedX + popupWidth > viewportWidth) {
      adjustedX = viewportWidth - popupWidth - 16;
    }
    
    if (adjustedY + popupHeight > viewportHeight) {
      adjustedY = viewportHeight - popupHeight - 16;
    }
    
    if (adjustedX < 16) {
      adjustedX = 16;
    }
    
    if (adjustedY < 16) {
      adjustedY = 16;
    }
    
    setAdjustedPosition({ x: adjustedX, y: adjustedY });
  }, [position]);

  return (
    <div 
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200"
      style={{ 
        top: `${adjustedPosition.y}px`, 
        left: `${adjustedPosition.x}px`
      }}
    >
      <div className="flex flex-col w-48">
        <button 
          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors rounded-t-lg"
          onClick={onMoveConference}
        >
          Move Conferences
        </button>
        <button 
          className="w-full px-4 py-2 text-left hover:bg-gray-100 transition-colors"
          onClick={onEditDetails}
        >
          Edit Details
        </button>
        <button 
          className="w-full px-4 py-2 text-left hover:bg-red-100 text-red-600 transition-colors rounded-b-lg"
          onClick={onDeleteTeam}
        >
          Delete Team
        </button>
      </div>
    </div>
  );
}