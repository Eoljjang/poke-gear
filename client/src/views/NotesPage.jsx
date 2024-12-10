import '../styles/views/NotesPage.css';
import Notebook from '../components/Notebook';
import Note from '../components/Note';
import ActiveNote from '../components/ActiveNote';
import { useState, useRef } from 'react';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styling.

function NotesPage() {
  // Single source of truth
  const [dummyData, setDummyData] = useState([
    {
      notebook_id: 1,
      name: 'Notebook 1',
      notes: [
        { note_id: 1, title: 'Deck 1', date:"mm/dd/yyyy", content: 'Content of note 1' },
        { note_id: 2, title: 'Deck 2', date:"mm/dd/yyyy", content: 'Content of note 2' },
      ],
    },
    {
      notebook_id: 2,
      name: 'Notebook 2',
      notes: [
        { note_id: 3, title: 'Deck 3', date:"mm/dd/yyyy", content: 'Content of note 3' },
        { note_id: 4, title: 'Deck 4', date:"mm/dd/yyyy", content: 'Content of note 4' },
      ],
    },
  ]);

  const [selectedNotebook, setSelectedNotebook] = useState(null); // ID of selected notebook
  const [selectedNote, setSelectedNote] = useState(null); // ID of selected note
  const toolbarRef = useRef(null); // Reference to the toolbar

  // Current notebook = selected one.
  const currentNotebook = dummyData.find(
    (notebook) => notebook.notebook_id === selectedNotebook
  );

  // The notes for the selected notebook.
  const currentNotes = currentNotebook ? currentNotebook.notes : [];

  // Find the active note based on the note_id.
  const activeNote = currentNotes.find((note) => note.note_id === selectedNote);

  // Handlers
  const handleNotebookClick = (notebookId) => {
    setSelectedNotebook(notebookId);
    setSelectedNote(null); // Reset note selection
  };

  const handleNoteClick = (noteId) => {
    setSelectedNote(noteId);
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
      <div className="notes-content">
        {/* 1) Notebook Selector */}
        <div className="notebooks-section">
          {dummyData.map((notebook) => (
            <Notebook
              key={notebook.notebook_id}
              notebook={notebook}
              onClick={() => handleNotebookClick(notebook.notebook_id)}
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
              onClick={() => handleNoteClick(note.note_id)}
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
            toolbarRef={toolbarRef}
            handleNoteTitleUpdate={handleNoteTitleUpdate}
            handleNoteUpdate={handleNoteUpdate}
          />
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
