# TODO:
**NOW**
- Fix Export JSON Button
- Cache database table information
- Show all teams not currently in FBS in the "Restore Teams" modal
- Show / Hide conferences
- Add / Edit / Delete Conferences
    - When adding a conference, allow user to name the conference. Instantiated with no teams
    - Edit conference pop-up shows list of each conference attribute, field to edit each. Save and cancel buttons
    - When deleting a conference, move teams from that conference to independent list

**SOON**
- View a webpage of a single conference, with more information visible
    - Export .zip with png's of each conference
- Drag Teams from one spot in a conference to another (currently they are always alphabetical)

**LATER**
- MapBox integration
    - Display teams on the map, pinpoints on their lat/long's
- Allow a user to load conferences/teams based on a json file
- Save a users changes in IndexedDB, or something like that

**MUCH LATER**
- Simulate a season
    - Assign schedule rules for each conference
        - For example, Big 10 plays 9 conference games. Team A must play team B. 12 game seasons. Each team from conference A plays a team from conference B. etc.
    - Generate a schedule, simulate it with each teams ELO rating determining the winner.
    - Allow user to manually manipulate schedule
    - Display each teams win loss record
    - Show each teams game-by-game record
    - Create rankings based on statistics
    - Create playoff bracket based on results
        - Allow a user to define the playoff bracket structure
    - Implement Bowl Games
    - Simulate post season