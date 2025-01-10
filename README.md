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
- [X] Online storage, some sort of database integration.
- [X] User can make an account to save thier information.
- [X] Live saving of note editing.
- [X] Save notebooks when they're created / deleted.
- [X] Save notes when they're created / deleted.
- [X] Add "last edited" and "date created" fields.
- [ ] Implement proper debounce for note update, renaming, add, delete, etc. to not overwhelm the database.
- [ ] Show a "saving" icon while the data is being uploaded to the db.
 
### Release v0.3 Goals: Integration of API's
- [ ] Decklist creation
- [ ] Able to add tags to notes (Ex: matchup, decklist, review, custom, etc.) -> Right click to add a tag.
- [ ] Integrate Poke-API in order to load in pokemon sprites.
- [ ] Find a API to load card images.

### Release v0.4 Goals: User Testing and Iterative Cleanup
- [ ] Get real world data and experiences to find out what should be added or changed.
- [ ] Test for 2 - 4 weeks.
- [ ] Make iterative changes based on feedback.

### Release v0.5 Goals: Security
- [ ] Make sure URL's are safe and properly updated.
- [ ] When switching between users, the new user should not have access to data from the previous user.
- [ ] Check that inputs block injections.

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

### Note Dump
- User can create decklists and associate them with notes. For example, referencing a specicic card in their decklist.
- **Important** We have to figure out how to scope CSS to their individual JSX files. The classnames are starting to overlap with the introduction of express.
- It's important to that we hash the passwords when we create a user. Currently it's just comparing them as strings which will not be good in the future.
- Do thorough testing of the URL and what parameters get passed to it.
- Currently when the user logs in, it loads all of their data. 
    - however if they sign out, that data is still visible in the console under "network".
    - This is horrendus security measures. So we should take this into account later on. WORK ON SECURITY.
- Currently we are querying the database from pre-defined ids like notebook_id, note_id, etc. Mongo actually automatically genereates an object id for each item. So it might be worthwhile to use that instead but idk yet.

### Backlog
- [ ] Show a circle loading icon when note is updating to to show it's successfully uploaded to db.
- [ ] Implement debounce for data syncing.
- [ ] when you spam update the database it seems to break it and it'll stop accepting requests unless you restar it. Debounce has been implemented for note content but it needs to be done for renaming the note title as well.