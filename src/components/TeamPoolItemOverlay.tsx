import { Team } from "../types/types";

interface TeamPoolItemOverlayProps {
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

export function TeamPoolItemOverlay({ team }: TeamPoolItemOverlayProps) {
  const contrastColor = getContrastColor(team.primary_color);

  return (
    <div
      className="px-3 py-1.5 rounded text-sm font-medium cursor-grabbing shadow-lg"
      style={{
        backgroundColor: team.primary_color,
        color: contrastColor,
        border: `2px solid ${team.primary_color}`,
      }}
    >
      {team.team_name}
    </div>
  );
}
