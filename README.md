TODO:

**NOW**
- Store teams and conferences in objects instead of json arrays
- Allow user to click on a team to display a pop up with three options: "move conference", "edit team", "delete team"
    - Move conference pop-up shows list of each conference, when a conference is clicked, the selected team moves to that conference
    - Edit team pop-up shows list of each team attribute, field to edit each. save and cancel buttons
    - delete team pop-up shows "are you sure?", then delete and cancel buttons
- Add team. Allow user to provide all the attributes. Name, City, State, Lat, Long, Nickname, Elo, Logo, etc.
- Improve styling
    - Light mode and dark mode ☀️🌑

**SOON**
- Drag Teams from one spot in a conference to another (currently they are always alphabetical)
- Add / Edit / Delete Conferences
    - When adding a conference, allow user to name the conference. Instantiated with no teams
    - Edit conference pop-up shows list of each conference attribute, field to edit each. Save and cancel buttons
    - When deleting a conference, move teams from that conference to independent list
- Show / Hide conferences
    - Maybe show power conferences only. Could be an option
- View a webpage of a single conference, with more information visible
- Add Teams
    - Add button on each conference card.
- Export
    - json file

**LATER**
- MapBox integration
    - Display teams on the map, pinpoints on their lat/long's
- Export
    - .zip with png's of each conference

**MUCH LATER**
- Simulate a season
    - This needs fleshed out more...
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