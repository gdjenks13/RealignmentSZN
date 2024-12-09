import { Conference, Team } from '../types/types';
import { TeamCard } from './TeamCard';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { useEffect, useRef, useState } from 'react';
import conferencesData from '../data/conferences.json';

interface ConferenceProps {
  conferenceId: number;
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
      src={conference.logo} 
      alt={`${conference.name}`}
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
  conferenceId, 
  teams, 
  highlighted, 
  onDragStart, 
  onDragEnd, 
  onTeamClick 
}: ConferenceProps) {
  const [hovered, setHovered] = useState(false);
  const conference = conferencesData.find(conf => conf.id === conferenceId) as Conference;
  
  if (!conference) {
    throw new Error(`Conference with id ${conferenceId} not found`);
  }

  const ref = useDropTarget(conferenceId, teams, setHovered);

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
      aria-label={`${conference.name} conference section`}
    >
      <ConferenceHeader 
        conference={conference} 
        teamsCount={teams.length} 
      />
      
      <div className="space-y-2">
        {teams.map(team => (
          <TeamCard
            key={team.id}
            team={team}
            onTeamClick={onTeamClick}
            onDragStart={() => onDragStart(conferenceId)}
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