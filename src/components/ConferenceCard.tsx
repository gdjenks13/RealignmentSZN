import { Conference } from '../types/types';
import { TeamCard } from './TeamCard';
import { useAtom } from 'jotai';

interface Props {
  conference: Conference;
}

export function ConferenceCard({ conference }: Props) {
  const [teams] = useAtom(conference.teams);
  return (
    <div
      className={`p-4 rounded-lg shadow-lg bg-white transition-colors`}
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