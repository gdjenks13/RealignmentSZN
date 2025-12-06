"""
Migration script to transform season JSON files into:
1. A master conferences.csv with all unique conferences
2. A master teams.csv with all unique teams (without conf_id)
3. Simplified season JSON files with conf_id -> [team_ids] mapping
"""

import json
import csv
import os
from pathlib import Path

# Paths
DATA_DIR = Path("src/data")
SEASONS_DIR = DATA_DIR / "seasons"
CONFERENCES_CSV = DATA_DIR / "conferences.csv"
TEAMS_CSV = DATA_DIR / "teams.csv"

def load_all_seasons():
    """Load all season JSON files and return them as a dict keyed by year."""
    seasons = {}
    for file in SEASONS_DIR.glob("*_season.json"):
        year = int(file.stem.split("_")[0])
        with open(file, "r", encoding="utf-8") as f:
            seasons[year] = json.load(f)
    return seasons

def extract_conferences(seasons):
    """Extract all unique conferences from all seasons."""
    conferences = {}
    for year, season_data in seasons.items():
        for conf in season_data:
            conf_id = conf["conf_id"]
            if conf_id not in conferences:
                conferences[conf_id] = {
                    "conf_id": conf["conf_id"],
                    "conf_name": conf["conf_name"],
                    "conf_longname": conf["conf_longname"],
                    "conf_abbreviation": conf["conf_abbreviation"],
                    "start_year": conf["start_year"],
                    "end_year": conf["end_year"],
                    "conf_logo": conf["conf_logo"]
                }
    return conferences

def extract_teams(seasons):
    """Extract all unique teams from all seasons."""
    teams = {}
    for year, season_data in seasons.items():
        for conf in season_data:
            for team in conf.get("teams", []):
                team_id = team["team_id"]
                if team_id not in teams:
                    teams[team_id] = {
                        "team_id": team["team_id"],
                        "team_name": team["team_name"],
                        "team_nickname": team["team_nickname"],
                        "team_abbreviation": team["team_abbreviation"],
                        "city": team["city"],
                        "state": team["state"],
                        "primary_color": team["primary_color"],
                        "secondary_color": team["secondary_color"],
                        "team_logo": team["team_logo"]
                    }
    return teams

def write_conferences_csv(conferences):
    """Write conferences to CSV file."""
    fieldnames = ["conf_id", "conf_name", "conf_longname", "conf_abbreviation", 
                  "start_year", "end_year", "conf_logo"]
    
    # Sort by conf_id
    sorted_confs = sorted(conferences.values(), key=lambda x: x["conf_id"])
    
    with open(CONFERENCES_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(sorted_confs)
    
    print(f"Written {len(sorted_confs)} conferences to {CONFERENCES_CSV}")

def write_teams_csv(teams):
    """Write teams to CSV file."""
    fieldnames = ["team_id", "team_name", "team_nickname", "team_abbreviation",
                  "city", "state", "primary_color", "secondary_color", "team_logo"]
    
    # Sort by team_id
    sorted_teams = sorted(teams.values(), key=lambda x: x["team_id"])
    
    with open(TEAMS_CSV, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(sorted_teams)
    
    print(f"Written {len(sorted_teams)} teams to {TEAMS_CSV}")

def transform_season_json(season_data):
    """Transform a season's data to the new format with just conf_id and team_ids."""
    transformed = []
    for conf in season_data:
        team_ids = [team["team_id"] for team in conf.get("teams", [])]
        transformed.append({
            "conf_id": conf["conf_id"],
            "teams": team_ids
        })
    return transformed

def write_transformed_seasons(seasons):
    """Write transformed season JSON files."""
    for year, season_data in seasons.items():
        transformed = transform_season_json(season_data)
        output_file = SEASONS_DIR / f"{year}_season.json"
        
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(transformed, f, indent=2)
        
        print(f"Transformed {output_file}")

def main():
    print("Starting data migration...")
    print("=" * 50)
    
    # Load all seasons
    print("Loading all season files...")
    seasons = load_all_seasons()
    print(f"Loaded {len(seasons)} seasons ({min(seasons.keys())} - {max(seasons.keys())})")
    
    # Extract unique conferences and teams
    print("\nExtracting unique conferences...")
    conferences = extract_conferences(seasons)
    print(f"Found {len(conferences)} unique conferences")
    
    print("\nExtracting unique teams...")
    teams = extract_teams(seasons)
    print(f"Found {len(teams)} unique teams")
    
    # Write CSV files
    print("\n" + "=" * 50)
    print("Writing CSV files...")
    write_conferences_csv(conferences)
    write_teams_csv(teams)
    
    # Transform and write season JSON files
    print("\n" + "=" * 50)
    print("Transforming season JSON files...")
    write_transformed_seasons(seasons)
    
    print("\n" + "=" * 50)
    print("Migration complete!")

if __name__ == "__main__":
    main()
