import { PrimitiveAtom } from "jotai";

export interface Team {
  teamId: number;
  schoolName: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  nickname: string;
  logo: string;
  conference: string;
  elo: number;
}

export interface Conference {
  id: string;
  name: string;
  logo: string;
  teams: PrimitiveAtom<Team[]>;
}