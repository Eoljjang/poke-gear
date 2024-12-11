import '../styles/views/NotesPage.css';
import Notebook from '../components/Notebook';
import Note from '../components/Note';
import ActiveNote from '../components/ActiveNote';
import ContextMenu from '../components/ContextMenu';
import Toolbar from '../components/Toolbar.jsx';
import { useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styling.

function NotesPage() {
  // Single source of truth
  const [dummyData, setDummyData] = useState([
    {
      notebook_id: 1,
      name: 'Notebook 1',
      sprite: "Put the link to the api sprite here.",
      notes: [
        { note_id: 1, title: 'Deck 1', date:"mm/dd/yyyy", content: 'Content of note 1' },
        { note_id: 2, title: 'Deck 2', date:"mm/dd/yyyy", content: 'Content of note 2' },
      ],
    },
    {
      notebook_id: 2,
      name: 'Notebook 2',
      sprite: "Put the link to the api sprite here.",
      notes: [
        { note_id: 3, title: 'Deck 3', date:"mm/dd/yyyy", content: 'Content of note 3' },
        { note_id: 4, title: 'Deck 4', date:"mm/dd/yyyy", content: 'Content of note 4' },
      ],
    },
  ]);

  const [selectedNotebook, setSelectedNotebook] = useState(null); // ID of selected notebook
  const [selectedNote, setSelectedNote] = useState(null); // ID of selected note
  const [contextMenu, setContextMenu] = useState({ visible: false, clickedItem:null, x: 0, y: 0 }); // state of the context menu.

  // Current notebook = selected one.
  const currentNotebook = dummyData.find(
    (notebook) => notebook.notebook_id === selectedNotebook
  );

  // The notes for the selected notebook.
  const currentNotes = currentNotebook ? currentNotebook.notes : [];

  // Find the active note based on the note_id.
  const activeNote = currentNotes.find((note) => note.note_id === selectedNote);

  // Handlers
  const handleNotebookClick = (e, notebookId) => {
    if (e.type === 'click'){
      console.log("Left clicked a notebook.");
      setSelectedNotebook(notebookId);
      setSelectedNote(null); // Reset note selection
    }
    else if (e.type === 'contextmenu'){
        console.log("Right clicked a notebook.");
        setContextMenu({
          visible: true,
          clickedItem: {notebook_id: notebookId},
          x: e.pageX,
          y: e.pageY,
        })
    }
  };

  const handleNoteClick = (e, noteId) => {
    console.log(e.button);
    if (e.type === 'click'){
      console.log("Left clicked a note.");
      setSelectedNote(noteId);
    }
    else if (e.type === "contextmenu"){
      console.log("Right clicked a note.");
      setContextMenu({
        visible: true,
        clickedItem: {note_id: noteId},
        x: e.pageX,
        y: e.pageY,
      })
    }
  };

  const handleContextMenuOptionClick = (action) => {
    console.log(`Selected option: ${action}`);
    setContextMenu({visible: false, x: 0, y: 0 }); // Hide context menu after selection
  };

  const handleCreateNotebook = () => {
    const newNotebook = {
      notebook_id: dummyData.length + 1,
      name: `Notebook ${dummyData.length + 1}`,
      notes: [],
    };
    setDummyData([...dummyData, newNotebook]);
  };

  const handleCreateNote = () => {
    if (currentNotebook) {
      const newNote = {
        note_id: currentNotebook.notes.length + 1,
        title: `New Note`,
        content: '',
        date: "mm/dd/yyyy"
      };
      setDummyData((prevData) =>
        prevData.map((notebook) =>
          notebook.notebook_id === selectedNotebook
            ? { ...notebook, notes: [...notebook.notes, newNote] }
            : notebook
        )
      );
    }
  };

  const handleNoteTitleUpdate = (noteId, updatedTitle) => {
    setDummyData((prevData) =>
      prevData.map((notebook) =>
        notebook.notebook_id === selectedNotebook
          ? {
              ...notebook,
              notes: notebook.notes.map((note) =>
                note.note_id === noteId
                  ? { ...note, title: updatedTitle}
                  : note
              ),
            }
          : notebook
      )
    );
  }

  const handleNoteUpdate = (noteId, updatedContent) => {
    setDummyData((prevData) =>
      prevData.map((notebook) =>
        notebook.notebook_id === selectedNotebook
          ? {
              ...notebook,
              notes: notebook.notes.map((note) =>
                note.note_id === noteId
                  ? { ...note, content: updatedContent }
                  : note
              ),
            }
          : notebook
      )
    );
  };

  return (
    <div className="notes-page-container">
      <Toolbar

      />
      <div className="notes-content">
        {/* 1) Notebook Selector */}
        <div className="notebooks-section">
          {dummyData.map((notebook) => (
            <Notebook
              key={notebook.notebook_id}
              notebook={notebook}
              handleNotebookClick={handleNotebookClick}
              selected={notebook.notebook_id === selectedNotebook}
            />
          ))}
          <button
            className="add-notebooks-button"
            onClick={handleCreateNotebook}
          >
            +
          </button>
        </div>

        {/* 2) Note Selector */}
        <div className="notes-section">
          {currentNotes.map((note) => (
            <Note
              key={note.note_id}
              note={note}
              handleNoteClick={handleNoteClick}
              selected={note.note_id === selectedNote}
            />
          ))}

          <button className="add-notebooks-button" onClick={handleCreateNote}>
            +
          </button>
        </div>

        {/* 3) Active Note Editor */}
        <div className="active-note-section">
          <ActiveNote
            activeNote={activeNote}
            handleNoteTitleUpdate={handleNoteTitleUpdate}
            handleNoteUpdate={handleNoteUpdate}
          />
        </div>
      </div>
      {/* If there was a right click, then we render the context menu. */}
      {contextMenu.visible && (
        <ContextMenu
            clickedItem = {contextMenu.clickedItem}
            posx = {contextMenu.x}
            posy = {contextMenu.y}
            handleContextMenuOptionClick={handleContextMenuOptionClick}
        />
      )}

    </div>
  );
}

export default NotesPage;
