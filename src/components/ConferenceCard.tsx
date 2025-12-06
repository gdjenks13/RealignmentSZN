import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Conference, Team } from "../types/types";
import { TeamCard } from "./TeamCard";

interface ConferenceProps {
  conference: Conference;
  teams: Team[];
  isOver: boolean;
  onTeamClick: (e: React.MouseEvent, team: Team) => void;
}

const ConferenceHeader = ({
  conference,
  teamsCount,
}: {
  conference: Conference;
  teamsCount: number;
}) => (
  <div className="flex items-center gap-3 mb-4">
    <img
      src={conference.conf_logo}
      alt={`${conference.conf_name}`}
      className="w-16 h-16 object-contain"
    />
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">({teamsCount} teams)</span>
    </div>
  </div>
);

export function ConferenceCard({
  conference,
  teams,
  isOver,
  onTeamClick,
}: ConferenceProps) {
  const { setNodeRef } = useDroppable({
    id: `conference-${conference.conf_id}`,
    data: { conferenceId: conference.conf_id, type: "conference" },
  });

  // Create sortable IDs for the teams in this conference
  const teamIds = teams.map((team) => `team-${team.team_id}`);

  return (
    <div
      ref={setNodeRef}
      className={`w-56 p-4 rounded-lg shadow-lg transition-colors ${
        isOver ? "bg-green-100" : "bg-white"
      }`}
      role="region"
      aria-label={`${conference.conf_name} conference section`}
    >
      <ConferenceHeader conference={conference} teamsCount={teams.length} />

      <SortableContext items={teamIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-2">
          {teams.map((team) => (
            <TeamCard
              key={team.team_id}
              team={team}
              onTeamClick={onTeamClick}
            />
          ))}

          {teams.length === 0 && (
            <div className="text-center py-4 text-gray-400">
              No teams in conference
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
