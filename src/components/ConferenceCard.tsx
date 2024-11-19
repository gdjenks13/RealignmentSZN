import { Conference } from '../types';
import { TeamCard } from './TeamCard';

interface Props {
  conference: Conference;
}

export function ConferenceCard({ conference }: Props) {
  return (
    <div
      className={`p-4 rounded-lg shadow-lg bg-white transition-colors`}
    >
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl font-bold">{conference.name}</h2>
        <img src={conference.logo} className="w-12 h-12"/>
        <span className="text-sm text-gray-500">
          ({conference.teams.length} teams)
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {conference.teams.map((team) => (
          <TeamCard key={team.teamId} team={team} />
        ))}
      </div>
    </div>
  );
}