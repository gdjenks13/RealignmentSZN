import { Conference } from '../types/types';
import { TeamCard } from './TeamCard';
import { useAtom } from 'jotai';
import { dropTargetForElements } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';
import { useEffect, useRef, useState } from 'react';

interface ConferenceProps {
  conference: Conference;
}

export function ConferenceCard({ conference }: ConferenceProps) {
  const [teams] = useAtom(conference.teams);
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el, 'Element ref is not set');

    return dropTargetForElements({
      element: el,
      onDragEnter: () => setHovered(true),
      onDragLeave: () => setHovered(false),
      onDrop: () => setHovered(false)
    })
  }, [teams])

  return (
    <div
      ref={ref}
      className={hovered ? "bg-blue-100 p-4 rounded-lg shadow-lg transition-colors" : "p-4 rounded-lg shadow-lg bg-white transition-colors"}
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
          <TeamCard key={team.teamId} team={team} />
        ))}
      </div>
    </div>
  );
}