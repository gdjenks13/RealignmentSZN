export interface Team {
  team_id: number;
  team_name: string;
  team_nickname: string;
  team_abbreviation: string;
  city: string;
  state: string;
  primary_color: string;
  secondary_color: string;
  team_logo: string;
  conf_id: number;
}

export interface Conference {
  conf_id: number;
  conf_name: string;
  conf_longname: string;
  conf_abbreviation: string;
  start_year: number;
  end_year: number;
  conf_logo: string;
  teams: Team[];
}