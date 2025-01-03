# Poke-Gear
## Release v1.0 Major Features:
1. Context WEB note taking app geared towards competitive pokemon players.
2. Fluid and rich note taking features. What deck you're taking notes for / against, different categories of notes.
3. Account creation, save your information online / to the cloud.

### Release v0.1 Goals: Concept & First UI.
- [X] A simple layout and vision for the interface should be developed.
- [X] Integrate a simple storage system, where the user can **save** notes into JSON format.

Note Taking Functionality:
- [X] Heirarchy organization.
- [X] Simple editing. Ideally we can store RTF.

### Release v0.2 Goals: Time to add some structure.
- [ ] Find a place to permanently host the website.
- [ ] Online storage, some sort of database integration.
- [ ] User can make an account to save thier information.

### Release v0.3 Goals: Integration of API's
- [ ] Decklist creation
- [ ] Able to add tags to notes (Ex: matchup, decklist, review, custom, etc.) -> Right click to add a tag.
- [ ] Integrate Poke-API in order to load in pokemon sprites.
- [ ] Find a API to load card images.

### Release v0.4 Goals: User Testing and Iterative Cleanup
- [ ] Get real world data and experiences to find out what should be added or changed.
- [ ] Test for 2 - 4 weeks.
- [ ] Make iterative changes based on feedback.

<i>Full 1.0 release after the user testing phase<i/>

---

### Run the app locally
1. In client folder: ```npm run watch```
2. Navigate to ```http://localhost:5173/```
    - Note that the you'll be automatically routed to /login.
3. In server folder: ```npm start```


### Running the app online
**Note:** The host server will automatically run a build on every new commit. Takes ~2 mins.
1. Navigate to ```https://poke-gear-ui.onrender.com/```

---

### Idea Dump
- User can create decklists and associate them with notes. For example, referencing a specicic card in their decklist.
- **Important** We have to figure out how to scope CSS to their individual JSX files. The classnames are starting to overlap with the introduction of express.
