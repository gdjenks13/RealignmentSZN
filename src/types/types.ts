export interface Location {
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface Team {
  id: number;
  school: string;
  mascot: string;
  abbreviation: string;
  conference: number;
  division: string | null;
  color: string;
  alt_color: string;
  logo: string;
  alt_logo: string;
  location: Location;
  elo: number;
}

export interface Conference {
  id: number;
  name: string;
  full_name: string;
  abbreviation: string;
  classification: string;
  logo: string;
  teams: Array<Team>;
}

export interface ConferenceWithTeams extends Conference {
  teams: Team[];
}