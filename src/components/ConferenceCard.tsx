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
  onDragStart: (conference: string) => void;
  onDragEnd: () => void;
}

export function ConferenceCard({ conferenceId, teams, highlighted, onDragStart, onDragEnd }: ConferenceProps) {
  const conference = conferencesData.find(conf => conf.id === conferenceId) as Conference;
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el, 'Element ref is not set');

    return dropTargetForElements({
      element: el,
      getData: () => ({ teams }),
      onDragEnter: () => setHovered(true),
      onDragLeave: () => setHovered(false),
      onDrop: () => setHovered(false)
    });
  }, [teams]);

  return (
    <div
      ref={ref}
      className={`w-56 p-4 rounded-lg shadow-lg ${highlighted ? "bg-red-50" : hovered ? "bg-green-100" : "bg-white"}`}
    >
      <div className="flex items-center gap-3 mb-4">
        {/* <h2 className="text-xl font-bold">{conference.name}</h2> */}
        <img src={conference.logo} className="w-16 h-16"/>
        <span className="text-sm text-gray-500">
          ({teams.length} teams)
        </span>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {teams.map((team) => (
          <TeamCard key={team.id} team={team} onDragStart={onDragStart} onDragEnd={onDragEnd} />
        ))}
      </div>
    </div>
  );
}