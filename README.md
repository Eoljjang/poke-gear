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
- [X] Find a place to permanently host the website.
- [X] Online storage, some sort of database integration.
- [X] User can make an account to save thier information.
- [X] Live saving of note editing.
- [X] Save notebooks when they're created / deleted.
- [X] Save notes when they're created / deleted.
- [X] Add "last edited" and "date created" fields.
- [X] Implement proper debounce for <del>note update</del>, renaming, <del>add</del>, <del>delete</del> to not overwhelm the database.
    - See backlog list as to why debounce was not implemented for renaming. We'll skip it for now and maybe re-visit it later.
- [X] Show a "syncing" icon while data is being synced to the database.

### Release v0.3 Goals: Clean up the SW. Add much needed security checks.
- [X] Check that you can't just navigate to whatever URL you want. IE: You have to be logged in in order to navigate to a specific link with query arguments. For example, you can take a logged in user's URL, paste it and navigate to it LOL.
    - This might be resolved by implementing react "onEnter" hook.
    - This behaviour exists in localhost, but does not exist once it's hosted on Render! Yahoo. So no changes were needed.
- [X] Check that inputs block injections.
    - This is automatically done by react / jsx. It escapes all text input.
- [X] Refactor: Make all usages of "date" consistent.
- [X] Refactor: Assign better notebook_ids and note_ids (we now use UUID)
- [X] Encrypt passwords when user signs up.
    - [X] Fix deploy issue now that I am using a bcrypt library. UPDATE: I Just had to change it to use "bcryptjs" library instead.
- [X] Refactor: Scope CSS files (this will take a long time).
    - [ ] Touching dashboard / app.css completely explodes the program so I will not touch it.

### Release v0.4 Goals: Add features to make it feel "complete".
- [X] User can re-size the notebooks & notes sections on NotesPage.jsx (naiive implementation).
- [X] User can add a quick note.
- [X] User can see their most recently edited notes on the dashboard. Clicking one takes them to the note.
- [X] Redesign the dashboard & add links to popular sites.
- [X] For each <strong> note:</strong> Able to add tags to notes (Ex: matchup, decklist, review, custom, etc.)
- [X] For any notebook / note, User can add a sprite for each notebook.


### Release v0.5 Goals: User Testing and Iterative Cleanup
- [ ] Get real world data and experiences to find out what should be added or changed.
- [ ] Use this time to fix backlog items, improve UI, code cleanup, etc. Small iterative changes only, no major logic changes.
 
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

### Bugs / Tickets to Do
- [ ] Add error handling if syncing fails. Display a failed sync message.
- [ ] Quill insert link on text far left extends too far to the left. So the insert link field gets cut off.
- [ ] Disabled clicking home-icon to navigate back to dashboard. There's a bug where this feature causes userData to not be refetched.
    - Solution is probably using some sort of global state for userData.
    - Keep this in mind if you use other links that navigate back home.
    - For some reason this issue does not exist in the sidebar.
- [X] Clicking outside of the sidebar should close it.
- [X] Clicking outside of the context menu should close it.
- [ ] If no notebook is selected, quicknote automatically should go under a "quicknotes" folder.
    - This is important as a new user actually can't use the "quicknotes" feature.
- [ ] Find some sort of use for the footer.
- [ ] Styling when a NEW user arrives is kinda wack.
