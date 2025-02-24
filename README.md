# Poke-Gear

## Running the App Locally
1. Navigate to the root of the repository.
2. Run ```npm run start-all```. This will start both the server and client.
3. Navigate to ```http://localhost:5173/```
    - Note that you'll be automatically routed to /login.

## Viewing the Hosted App
**Note:** The host server will automatically run a build on merge into main. Takes ~2 mins.
1. Navigate to ```https://poke-gear-ui.onrender.com/```

---

### Release Versions & Features
<details>
<summary>v0.1 - Concept</summary>

- [X] A simple layout and vision for the interface should be developed.
- [X] Integrate a simple storage system, where the user can **save** notes into JSON format.
- [X] Hierarchy organization.
- [X] Simple editing. Ideally, we can store RTF.
</details>

<details>
<summary>v0.2 - Moving the app Online.</summary>

- [X] Find a place to permanently host website.<br>
- [X] Online storage, some sort of database integration.
- [X] User can make an account to save their information.
- [X] Live saving of note editing.
- [X] Save notebooks when they're created / deleted.
- [X] Save notes when they're created / deleted.
- [X] Add "last edited" and "date created" fields.
- [X] Implement proper debounce for <del>note update</del>, renaming, <del>add</del>, <del>delete</del> to not overwhelm the database.
- [X] Show a "syncing" icon while data is being synced to the database.

</details>

<details>
<summary>v0.3 - Security.</summary>

- [X] Check that you can't just navigate to whatever URL you want. For example, you must be logged in to navigate to a specific link with query arguments. (For instance, you can take a logged-in user's URL, paste it, and navigate to it.)
    - This might be resolved by implementing React "onEnter" hook.
    - This behavior exists in localhost but does not exist once it's hosted on Render. So no changes were needed.
- [X] Check that inputs block injections.
    - This is automatically done by React / JSX. It escapes all text input.
- [X] Refactor: Make all usages of "date" consistent.
- [X] Refactor: Assign better notebook_ids and note_ids (we now use UUID).
- [X] Encrypt passwords when user signs up.
    - [X] Fix deploy issue now that I am using a bcrypt library. UPDATE: I just had to change it to use the "bcryptjs" library instead.
- [X] Refactor: Scope CSS files (this will take a long time).
    - [ ] Touching dashboard / app.css completely explodes the program, so I will not touch it.

</details>

<details>
<summary>v0.4 - Maturing features.</summary>

- [X] User can resize the notebooks & notes sections on NotesPage.jsx (naive implementation).
- [X] User can add a quick note.
- [X] User can see their most recently edited notes on the dashboard. Clicking one takes them to the note.
- [X] Redesign the dashboard & add links to popular sites.
- [X] For each <strong>note:</strong> Able to add tags to notes (Ex: matchup, decklist, review, custom, etc.)
- [X] For any notebook / note, User can add a sprite for each notebook.

</details>

<details>
<summary>v0.5 - User Testing & Feedback.</summary>

- [ ] Get real-world data and experiences to find out what should be added or changed.
- [ ] Use this time to fix backlog items, improve UI, code cleanup, etc. Small iterative changes only, no major logic changes.

<i>Full 1.0 release after the user testing phase</i>

</details>

### Project Board - Bugs, Tickets, Backlog.
https://github.com/users/Eoljjang/projects/3

---

### Idea / Feature Request Dump

<details>
<summary>Expand</summary>

- User can create decklists and associate them with notes. For example, referencing a specific card in their decklist.
- Currently, when the user logs in, it loads all of their data.
    - However, if they sign out, that data is still visible in the console under "network".
    - This is horrendous security. We should take this into account later on. WORK ON SECURITY.
- 'Forgot password' feature.
- Importing deck lists from RK9?

</details>
