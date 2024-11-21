import { useEffect, useRef, useState } from 'react';
import { Team } from '../types/types';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';

interface TeamProps {
  team: Team;
}

export function TeamCard({ team }: TeamProps) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el, 'Element ref is not set');

    return draggable({
      element: el,
      getInitialData: () => ({ team }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false)
    })
  }, [team]);

  return (
    <div
      ref={ref}
      className="p-3 rounded-md border border-gray-200 cursor-move"
    >
      <div className="flex items-center gap-2">
        {/* <img
          src={team.logo}
          alt={`${team.schoolName} logo`}
          className="w-8 h-8 object-contain"
        /> */}
        <div className={dragging ? "opacity-50" : ""}>
          <h3 className="font-semibold text-sm">{team.schoolName}</h3>
          <p className="text-xs text-gray-500">
            {team.city}, {team.state}
          </p>
        </div>
      </div>
    </div>
  );
}

