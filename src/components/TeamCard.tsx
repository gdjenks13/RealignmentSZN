import { useEffect, useRef, useState } from 'react';
import { Team } from '../types/types';
import { draggable } from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import invariant from 'tiny-invariant';

interface TeamProps {
  team: Team;
  onTeamClick: (e: React.MouseEvent, team: Team) => void;
  onDragStart: (conference: string) => void;
  onDragEnd: () => void;
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export function TeamCard({ team, onTeamClick, onDragStart, onDragEnd }: TeamProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    invariant(el, 'Element ref is not set');

    return draggable({
      element: el,
      getInitialData: () => ({ type: "team", team }),
      onDragStart: () => {
        setDragging(true);
        onDragStart(team.conference.toString());
      },
      onDrop: () => {
        setDragging(false);
        onDragEnd();
      }
    });
  }, [team, onDragStart, onDragEnd]);

  const teamColorRgb = hexToRgb(team.color);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onTeamClick(e, team);
      }}
      className="team-card p-3 rounded-md cursor-pointer"
      style={{ '--team-color-rgb': teamColorRgb } as React.CSSProperties}
    >
      <div className="flex items-center gap-2">
        <img
          src={team.logo}
          alt={`${team.school} logo`}
          className="w-8 h-8 object-contain"
        />
        <div className={dragging ? "opacity-40" : ""}>
          <h3 className="font-semibold text-sm">{team.school}</h3>
          <p className="text-xs text-gray-500">
            {team.location.city}, {team.location.state}
          </p>
        </div>
      </div>
    </div>
  );
}