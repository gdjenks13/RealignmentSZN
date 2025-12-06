import { Conference } from "../types/types";

const DB_NAME = "realignment_db";
const DB_VERSION = 1;
const CONFERENCES_STORE = "conferences";
const USER_CHANGES_STORE = "user_changes";

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

// Load from local JSON files
const loadFromFile = async (year: number): Promise<Conference[] | null> => {
  try {
    const data = await import(`../data/seasons/${year}_season.json`);
    return data.default as Conference[];
  } catch {
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

// Export functions for potential use in components
export { type UserChange, type SavedConferenceData };
