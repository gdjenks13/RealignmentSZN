import { useDraggable } from "@dnd-kit/core";
import { Team } from "../types/types";

interface TeamPoolItemProps {
  team: Team;
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function getContrastColor(hex: string): string {
  const { r, g, b } = hexToRgb(hex);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

function TeamPoolItem({ team }: TeamPoolItemProps) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `pool-team-${team.team_id}`,
    data: { team, type: "pool-team" },
  });

  const contrastColor = getContrastColor(team.primary_color);

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`group relative px-3 py-1.5 rounded text-sm font-medium cursor-grab border-2 ${
        isDragging ? "opacity-50" : ""
      }`}
      style={
        {
          "--team-color": team.primary_color,
          "--contrast-color": contrastColor,
          borderColor: team.primary_color,
        } as React.CSSProperties
      }
    >
      {/* Default state layer */}
      <span className="absolute inset-0 rounded-sm bg-white group-hover:bg-transparent" />
      {/* Hover state layer */}
      <span
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100"
        style={{ backgroundColor: team.primary_color }}
      />
      {/* Text content */}
      <span
        className="relative text-gray-700 group-hover:text-[--contrast-color]"
        style={{ "--contrast-color": contrastColor } as React.CSSProperties}
      >
        {team.team_name}
      </span>
    </div>
  );
}

interface TeamPoolProps {
  teams: Team[];
  assignedTeamIds: Set<number>;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TeamPool({
  teams,
  assignedTeamIds,
  searchQuery,
  onSearchChange,
}: TeamPoolProps) {
  // Filter teams that haven't been assigned and match search
  const availableTeams = teams.filter((team) => {
    const matchesSearch =
      searchQuery === "" ||
      team.team_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.state.toLowerCase().includes(searchQuery.toLowerCase());
    const notAssigned = !assignedTeamIds.has(team.team_id);
    return matchesSearch && notAssigned;
  });

  // Sort alphabetically by team name
  const sortedTeams = [...availableTeams].sort((a, b) =>
    a.team_name.localeCompare(b.team_name)
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg text-gray-800">
          Available Teams ({sortedTeams.length})
        </h3>
      </div>

      <input
        type="text"
        placeholder="Search teams..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-red-500"
      />

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-wrap gap-2">
          {sortedTeams.map((team) => (
            <TeamPoolItem key={team.team_id} team={team} />
          ))}
          {sortedTeams.length === 0 && (
            <p className="text-gray-500 text-sm w-full text-center py-4">
              {searchQuery
                ? "No teams match your search"
                : "All teams have been assigned"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
