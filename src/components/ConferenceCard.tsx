import { Conference, Team } from '../types/types';
import { TeamCard } from './TeamCard';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { useEffect, useRef, useState } from 'react';

interface ConferenceProps {
  conference: Conference;
  teams: Team[];
  highlighted: boolean;
  onDragStart: (conferenceId: number) => void;
  onDragEnd: () => void;
  onTeamClick: (e: React.MouseEvent, team: Team) => void;
}

const useDropTarget = (conferenceId: number, teams: Team[], onHoverChange: (isHovered: boolean) => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    invariant(el, 'Element ref is not set');

    return dropTargetForElements({
      element: el,
      getData: () => ({ conferenceId, teams }),
      onDragEnter: () => onHoverChange(true),
      onDragLeave: () => onHoverChange(false),
      onDrop: () => onHoverChange(false)
    });
  }, [conferenceId, teams, onHoverChange]);

  return ref;
};

const ConferenceHeader = ({ conference, teamsCount }: { conference: Conference; teamsCount: number }) => (
  <div className="flex items-center gap-3 mb-4">
    <img 
      src={conference.conf_logo} 
      alt={`${conference.conf_name}`}
      className="w-16 h-16 object-contain"
    />
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">
        ({teamsCount} teams)
      </span>
    </div>
  </div>
);

export function ConferenceCard({ 
  conference,
  teams, 
  highlighted, 
  onDragStart, 
  onDragEnd, 
  onTeamClick 
}: ConferenceProps) {
  const [hovered, setHovered] = useState(false);

  const ref = useDropTarget(conference.conf_id, teams, setHovered);

  const getBackgroundColor = () => {
    if (highlighted) return "bg-red-50";
    if (hovered) return "bg-green-100";
    return "bg-white";
  };

  return (
    <div
      ref={ref}
      className={`w-56 p-4 rounded-lg shadow-lg transition-colors ${getBackgroundColor()}`}
      role="region"
      aria-label={`${conference.conf_name} conference section`}
    >
      <ConferenceHeader 
        conference={conference} 
        teamsCount={teams.length} 
      />
      
      <div className="space-y-2">
        {teams.map(team => (
          <TeamCard
            key={team.team_id}
            team={team}
            onTeamClick={onTeamClick}
            onDragStart={() => onDragStart(conference.conf_id)}
            onDragEnd={onDragEnd}
          />
        ))}
        
        {teams.length === 0 && (
          <div className="text-center py-4 text-gray-400">
            No teams in conference
          </div>
        )}
      </div>
    </div>
  );
}