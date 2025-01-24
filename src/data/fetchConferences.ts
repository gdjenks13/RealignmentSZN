import { writeFile } from "fs/promises";
import { fetchAll } from "./supabase_setup";
import { Conference } from "../types/types";

async function saveConferencesByYear(startYear: number, endYear: number) {
  for (let year = startYear; year <= endYear; year++) {
    try {
      console.log(`Fetching data for year ${year}...`);
      const conferences: Conference[] = await fetchAll(year);
      
      const fileName = `${year}_season.json`;
      const jsonData = JSON.stringify(conferences, null, 2); // Pretty format the JSON
      
      await writeFile(fileName, jsonData, "utf-8");
      console.log(`Saved ${fileName}`);
    } catch (error) {
      console.error(`Failed to fetch or save data for year ${year}:`, error);
    }
  }
}

const startYear = 1978;
const endYear = 2024;

saveConferencesByYear(startYear, endYear)
  .then(() => console.log("All files saved successfully!"))
  .catch((error) => console.error("Unexpected error:", error));
