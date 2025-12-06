import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Conference, Team } from "../types/types";
import { TeamCard } from "./TeamCard";
import { useMemo } from "react";

interface ConferenceProps {
  conference: Conference;
  teams: Team[];
  isOver: boolean;
  activeTeam: Team | null;
  overTeamId: number | null;
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
  activeTeam,
  overTeamId,
  onTeamClick,
}: ConferenceProps) {
  const { setNodeRef } = useDroppable({
    id: `conference-${conference.conf_id}`,
    data: { conferenceId: conference.conf_id, type: "conference" },
  });

  // Check if we're dragging a team from another conference into this one
  const isDraggingFromOtherConference =
    activeTeam && activeTeam.conf_id !== conference.conf_id && isOver;

  // Build the display teams list - insert a placeholder if dragging from another conference
  const displayTeams = useMemo(() => {
    if (!isDraggingFromOtherConference || !activeTeam) {
      return teams;
    }

    // Find where to insert the placeholder based on overTeamId
    const result: (Team | { isPlaceholder: true; team: Team })[] = [];

    if (overTeamId) {
      const overIndex = teams.findIndex((t) => t.team_id === overTeamId);
      if (overIndex !== -1) {
        // Insert placeholder before the team we're hovering over
        for (let i = 0; i < teams.length; i++) {
          if (i === overIndex) {
            result.push({ isPlaceholder: true, team: activeTeam });
          }
          result.push(teams[i]);
        }
        return result;
      }
    }

    // If no specific team is hovered, add to end
    return [...teams, { isPlaceholder: true, team: activeTeam }];
  }, [teams, isDraggingFromOtherConference, activeTeam, overTeamId]);

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
          {displayTeams.map((item) => {
            if ("isPlaceholder" in item) {
              // Render placeholder for the team being dragged in
              return (
                <div
                  key={`placeholder-${item.team.team_id}`}
                  className="p-3 rounded-md border-2 border-dashed border-green-400 bg-green-50 opacity-70"
                >
                  <div className="flex items-center gap-2">
                    {item.team.team_logo ? (
                      <img
                        src={item.team.team_logo}
                        alt={`${item.team.team_name} logo`}
                        className="w-8 h-8 object-contain opacity-50"
                      />
                    ) : (
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center opacity-50"
                        style={{
                          backgroundColor: item.team.primary_color,
                          color: item.team.secondary_color,
                        }}
                      >
                        <span className="text-base font-bold">
                          {item.team.team_name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-sm text-green-700">
                        {item.team.team_name}
                      </h3>
                      <p className="text-xs text-green-600">
                        {item.team.city}, {item.team.state}
                      </p>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <TeamCard
                key={item.team_id}
                team={item}
                onTeamClick={onTeamClick}
              />
            );
          })}

          {teams.length === 0 && !isDraggingFromOtherConference && (
            <div className="text-center py-4 text-gray-400">
              No teams in conference
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}
