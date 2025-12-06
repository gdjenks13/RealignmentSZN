import { Conference, Team } from "../types/types";
import conferencesCSV from "./conferences.csv?raw";
import teamsCSV from "./teams.csv?raw";

const DB_NAME = "realignment_db";
const DB_VERSION = 2; // Bump version to add custom conferences store
const CONFERENCES_STORE = "conferences";
const USER_CHANGES_STORE = "user_changes";
const CUSTOM_CONFERENCES_STORE = "custom_conferences";

// Raw data types from CSV/JSON files
interface RawConference {
  conf_id: number;
  conf_name: string;
  conf_longname: string;
  conf_abbreviation: string;
  start_year: number;
  end_year: number;
  conf_logo: string;
}

interface RawTeam {
  team_id: number;
  team_name: string;
  team_nickname: string;
  team_abbreviation: string;
  city: string;
  state: string;
  primary_color: string;
  secondary_color: string;
  team_logo: string;
}

interface SeasonEntry {
  conf_id: number;
  teams: number[];
}

// Cache for master data (loaded once)
let conferencesCache: Map<number, RawConference> | null = null;
let teamsCache: Map<number, RawTeam> | null = null;

// Parse CSV content into array of objects
const parseCSV = <T>(csvContent: string): T[] => {
  const lines = csvContent.trim().split("\n");
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim());
  const results: T[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const values: string[] = [];
    let current = "";
    let inQuotes = false;

    // Parse CSV with proper quote handling for base64 logos
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    const obj: Record<string, unknown> = {};
    headers.forEach((header, index) => {
      let value: unknown = values[index] || "";
      // Convert numeric fields
      if (["conf_id", "team_id", "start_year", "end_year"].includes(header)) {
        value = parseInt(value as string, 10) || 0;
      }
      obj[header] = value;
    });
    results.push(obj as T);
  }

  return results;
};

// Load master conferences data (parsed from imported CSV)
const loadConferencesMaster = (): Map<number, RawConference> => {
  if (conferencesCache) return conferencesCache;

  try {
    if (!conferencesCSV || typeof conferencesCSV !== "string") {
      console.error("Conferences CSV not loaded properly:", conferencesCSV);
      throw new Error("Conferences CSV failed to import");
    }

    const conferences = parseCSV<RawConference>(conferencesCSV);
    conferencesCache = new Map();
    conferences.forEach((conf) => {
      conferencesCache!.set(conf.conf_id, conf);
    });

    console.log(`Loaded ${conferences.length} conferences from CSV`);
    return conferencesCache;
  } catch (error) {
    console.error("Error loading conferences master data:", error);
    throw error;
  }
};

// Load master teams data (parsed from imported CSV)
const loadTeamsMaster = (): Map<number, RawTeam> => {
  if (teamsCache) return teamsCache;

  try {
    if (!teamsCSV || typeof teamsCSV !== "string") {
      console.error("Teams CSV not loaded properly:", teamsCSV);
      throw new Error("Teams CSV failed to import");
    }

    const teams = parseCSV<RawTeam>(teamsCSV);
    teamsCache = new Map();
    teams.forEach((team) => {
      teamsCache!.set(team.team_id, team);
    });

    console.log(`Loaded ${teams.length} teams from CSV`);
    return teamsCache;
  } catch (error) {
    console.error("Error loading teams master data:", error);
    throw error;
  }
};

// Initialize IndexedDB
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Store for cached conference data by year
      if (!db.objectStoreNames.contains(CONFERENCES_STORE)) {
        db.createObjectStore(CONFERENCES_STORE, { keyPath: "year" });
      }

      // Store for user modifications (team moves, edits, etc.)
      if (!db.objectStoreNames.contains(USER_CHANGES_STORE)) {
        const userStore = db.createObjectStore(USER_CHANGES_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        userStore.createIndex("year", "year", { unique: false });
        userStore.createIndex("type", "type", { unique: false });
      }

      // Store for custom conferences (user-created from scratch)
      if (!db.objectStoreNames.contains(CUSTOM_CONFERENCES_STORE)) {
        db.createObjectStore(CUSTOM_CONFERENCES_STORE, { keyPath: "id" });
      }
    };
  });
};

// Types for user changes
interface UserChange {
  id?: number;
  year: number;
  type: "move_team" | "edit_team" | "delete_team" | "add_team" | "full_save";
  timestamp: number;
  data: unknown;
}

interface SavedConferenceData {
  year: number;
  conferences: Conference[];
  savedAt: number;
}

// Load from local JSON files and combine with master data
const loadFromFile = async (year: number): Promise<Conference[] | null> => {
  try {
    // Load master data (synchronous, uses cached imports)
    const conferencesMaster = loadConferencesMaster();
    const teamsMaster = loadTeamsMaster();

    // Load season data
    const seasonData = await import(`../data/seasons/${year}_season.json`);
    const seasonEntries = seasonData.default as SeasonEntry[];

    // Build full conference objects with teams
    const conferences: Conference[] = seasonEntries
      .map((entry) => {
        const confData = conferencesMaster.get(entry.conf_id);
        if (!confData) {
          console.warn(`Conference ${entry.conf_id} not found in master data`);
          return null;
        }

        // Build team objects for this conference
        const teams: Team[] = entry.teams
          .map((teamId) => {
            const teamData = teamsMaster.get(teamId);
            if (!teamData) {
              console.warn(`Team ${teamId} not found in master data`);
              return null;
            }
            return {
              ...teamData,
              conf_id: entry.conf_id,
            } as Team;
          })
          .filter((t): t is Team => t !== null);

        return {
          ...confData,
          teams,
        } as Conference;
      })
      .filter((c): c is Conference => c !== null);

    return conferences;
  } catch (error) {
    console.error(`Failed to load data for year ${year}:`, error);
    return null;
  }
};

// Save conferences to IndexedDB
export const saveConferencesToDB = async (
  year: number,
  conferences: Conference[]
): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CONFERENCES_STORE], "readwrite");
    const store = transaction.objectStore(CONFERENCES_STORE);

    const data: SavedConferenceData = {
      year,
      conferences,
      savedAt: Date.now(),
    };

    const request = store.put(data);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Load conferences from IndexedDB
export const loadConferencesFromDB = async (
  year: number
): Promise<Conference[] | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CONFERENCES_STORE], "readonly");
    const store = transaction.objectStore(CONFERENCES_STORE);
    const request = store.get(year);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result as SavedConferenceData | undefined;
      resolve(result?.conferences || null);
    };
  });
};

// Check if we have saved data for a year
export const hasSavedData = async (year: number): Promise<boolean> => {
  const data = await loadConferencesFromDB(year);
  return data !== null;
};

// Clear saved data for a year (reset to original)
export const clearSavedData = async (year: number): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CONFERENCES_STORE], "readwrite");
    const store = transaction.objectStore(CONFERENCES_STORE);
    const request = store.delete(year);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Clear all saved data
export const clearAllSavedData = async (): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(
      [CONFERENCES_STORE, USER_CHANGES_STORE],
      "readwrite"
    );

    const confStore = transaction.objectStore(CONFERENCES_STORE);
    const userStore = transaction.objectStore(USER_CHANGES_STORE);

    confStore.clear();
    userStore.clear();

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
};

// Log a user change (for potential undo/history feature)
export const logUserChange = async (
  change: Omit<UserChange, "id" | "timestamp">
): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([USER_CHANGES_STORE], "readwrite");
    const store = transaction.objectStore(USER_CHANGES_STORE);

    const request = store.add({
      ...change,
      timestamp: Date.now(),
    });

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Main fetch function - tries IndexedDB first, then falls back to local JSON files
export const fetchAll = async (year: number): Promise<Conference[]> => {
  // First check if we have saved modifications in IndexedDB
  try {
    const savedData = await loadConferencesFromDB(year);
    if (savedData) {
      console.log(`Loaded ${year} data from IndexedDB (user modifications)`);
      return savedData;
    }
  } catch (error) {
    console.warn("IndexedDB load failed:", error);
  }

  // Fall back to local JSON files
  const fileData = await loadFromFile(year);
  if (fileData) {
    console.log(`Loaded ${year} data from local JSON files`);
    return fileData;
  }

  // Return empty array if nothing works
  console.warn(`No data found for year ${year}`);
  return [];
};

// Auto-save helper - call this when user makes changes
export const autoSave = async (
  year: number,
  conferences: Conference[]
): Promise<void> => {
  try {
    await saveConferencesToDB(year, conferences);
    console.log(`Auto-saved ${year} data to IndexedDB`);
  } catch (error) {
    console.error("Auto-save failed:", error);
  }
};

// Get list of years that have saved modifications
export const getModifiedYears = async (): Promise<number[]> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CONFERENCES_STORE], "readonly");
    const store = transaction.objectStore(CONFERENCES_STORE);
    const request = store.getAllKeys();

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      resolve(request.result as number[]);
    };
  });
};

// Custom Conferences Storage
interface CustomConferencesData {
  id: string; // Always "current" for single save
  conferences: Conference[];
  savedAt: number;
}

// Save custom conferences to IndexedDB
export const saveCustomConferences = async (
  conferences: Conference[]
): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CUSTOM_CONFERENCES_STORE], "readwrite");
    const store = transaction.objectStore(CUSTOM_CONFERENCES_STORE);

    const data: CustomConferencesData = {
      id: "current",
      conferences,
      savedAt: Date.now(),
    };

    const request = store.put(data);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Load custom conferences from IndexedDB
export const loadCustomConferences = async (): Promise<Conference[] | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CUSTOM_CONFERENCES_STORE], "readonly");
    const store = transaction.objectStore(CUSTOM_CONFERENCES_STORE);
    const request = store.get("current");

    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      const result = request.result as CustomConferencesData | undefined;
      resolve(result?.conferences || null);
    };
  });
};

// Check if we have saved custom conferences
export const hasCustomConferences = async (): Promise<boolean> => {
  const data = await loadCustomConferences();
  return data !== null;
};

// Clear custom conferences
export const clearCustomConferences = async (): Promise<void> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([CUSTOM_CONFERENCES_STORE], "readwrite");
    const store = transaction.objectStore(CUSTOM_CONFERENCES_STORE);
    const request = store.delete("current");

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
};

// Export master data accessors for use in components
export const getAllConferences = (): RawConference[] => {
  const map = loadConferencesMaster();
  return Array.from(map.values());
};

export const getAllTeams = (): RawTeam[] => {
  const map = loadTeamsMaster();
  return Array.from(map.values());
};

// Export functions for potential use in components
export {
  type UserChange,
  type SavedConferenceData,
  type RawConference,
  type RawTeam,
};
