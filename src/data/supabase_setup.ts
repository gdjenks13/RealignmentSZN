import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/supabase";
import { Conference, Team } from "../types/types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

type dbConference = Database['public']['Tables']['conferences']['Row'];
type dbTeam = Database['public']['Tables']['teams']['Row'];
type dbSeason = Database['public']['Tables']['seasons']['Row'];

export const fetchConferences = async (): Promise<dbConference[]> => {
  const { data: conferences, error: confError } = await supabase
    .from("conferences")
    .select("*");

  if (confError) throw confError;

  return conferences;
};

export const fetchTeams = async (): Promise<dbTeam[]> => {
  const { data: teams, error: teamsError } = await supabase
    .from("teams")
    .select("*");

  if (teamsError) throw teamsError;

  return teams;
};

export const fetchSeasons = async (year: number): Promise<dbSeason[]> => {
  const { data: seasons, error: seasonsError } = await supabase
    .from("seasons")
    .select("*")
    .eq("year", year);

  if (seasonsError) throw seasonsError;

  return seasons;
};

const loadFromFile = async (year: number): Promise<Conference[] | null> => {
  try {
    const data = await import(`../data/seasons/${year}_season.json`);
    return data.default as Conference[];
  } catch (error) {
    return null;
  }
};

export const fetchAll = async (year: number): Promise<Conference[]> => {
  const fileData = await loadFromFile(year);
  if (fileData) {
    console.log("great success")
    return fileData;
  }
  
  try {
    const dbConferences = await fetchConferences();
    const dbTeams = await fetchTeams();
    const dbSeasons = await fetchSeasons(year);

    const conferenceTeams = dbSeasons.reduce((item, season) => {
      if (!item[season.conf_id]) {
        item[season.conf_id] = [];
      }
      const team = dbTeams.find(t => t.team_id === season.team_id);
      if (team) {
        item[season.conf_id].push({
          team_id: team.team_id,
          team_name: team.team_name,
          team_nickname: team.team_nickname || '',
          team_abbreviation: team.team_abbreviation || '',
          city: team.city || '',
          state: team.state || '',
          primary_color: team.primary_color || '',
          secondary_color: team.secondary_color || '',
          team_logo: team.team_logo ? `data:image/svg+xml;base64,${btoa(team.team_logo)}` : '',
          conf_id: season.conf_id
        });
      }
      return item;
    }, {} as Record<number, Team[]>);

    // Map to Conference array
    const conferences: Conference[] = dbConferences.map(conf => ({
      conf_id: conf.conf_id,
      conf_name: conf.conf_name,
      conf_longname: conf.conf_longname || '',
      conf_abbreviation: conf.conf_abbreviation || '',
      start_year: conf.start_year,
      end_year: conf.end_year || 0,
      conf_logo: conf.conf_logo ? `data:image/svg+xml;base64,${btoa(conf.conf_logo)}` : '',
      teams: conferenceTeams[conf.conf_id] || []
    })).filter(conf => conf.teams.length > 0);
    return conferences;

  } catch (error) {
    console.error(error);
    return [];
  }
};
