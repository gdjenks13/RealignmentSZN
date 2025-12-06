import { Team } from "../types/types";

interface TeamCardOverlayProps {
  team: Team;
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r}, ${g}, ${b}`;
}

export function TeamCardOverlay({ team }: TeamCardOverlayProps) {
  const teamColorRgb = hexToRgb(team.primary_color);

  return (
    <div
      className="team-card p-3 rounded-md cursor-grabbing opacity-80 shadow-xl"
      style={
        {
          "--team-color-rgb": teamColorRgb,
          backgroundColor: "white",
          width: "200px",
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-2">
        {team.team_logo ? (
          <img
            src={team.team_logo}
            alt={`${team.team_name} logo`}
            className="w-8 h-8 object-contain"
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
            style={{
              backgroundColor: team.primary_color,
              color: team.secondary_color,
            }}
          >
            <span className="text-base font-bold">
              {team.team_name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div>
          <h3 className="font-semibold text-sm">{team.team_name}</h3>
          <p className="text-xs text-gray-500">
            {team.city}, {team.state}
          </p>
        </div>
      </div>
    </div>
  );
}
