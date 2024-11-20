import { Team } from '../types/types';

interface Props {
  team: Team;
}

export function TeamCard({ team }: Props) {
  return (
    <div
      className="p-3 rounded-md border border-gray-200 cursor-move transition-opacity"
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