import { useDrag } from 'react-dnd';
import { Team } from '../types';

interface Props {
  team: Team;
}

export function TeamCard({ team }: Props) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'team',
    item: { teamId: team.teamId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-3 rounded-md border border-gray-200 cursor-move transition-opacity ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center gap-2">
        {/* <img
          src={team.logo}
          alt={`${team.schoolName} logo`}
          className="w-8 h-8 object-contain"
        /> */}
        <div>
          <h3 className="font-semibold text-sm">{team.schoolName}</h3>
          <p className="text-xs text-gray-500">
            {team.city}, {team.state}
          </p>
        </div>
      </div>
    </div>
  );
}