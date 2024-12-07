import '../styles/views/NotesPage.css'
import Notebook from '../components/Notebook';
import Note from '../components/Note';
import ActiveNote from '../components/ActiveNote';
import { useState } from 'react';
import { useOutletContext } from "react-router-dom"


const dummyData = [
    {
      notebook_id: 1,
      name: 'Notebook 1',
      notes: [
        { note_id: 1, title: 'Deck 1', content: 'Content of note 1' },
        { note_id: 2, title: 'Deck 2', content: 'Content of note 2' },
      ],
    },
    {
      notebook_id: 2,
      name: 'Notebook 2',
      notes: [
        { note_id: 1, title: 'Deck 3', content: 'Content of note 3' },
        { note_id: 2, title: 'Deck 4', content: 'Content of note 4' },
      ],
    },
  ];

function NotesPage() {
    const [dummyUser] = useOutletContext();

    const [selectedNotebook, setSelectedNotebook] = useState(null); // Pass the ID of the selected notebook.
    const [selectedNote, setSelectedNote] = useState(null); // Pass the ID of the selected note.
    const [notebookIndex, setNotebookIndex] = useState(0); // Pass the index of the selected note.

    const handleNotebookClick = (notebookId) => {
      console.log(notebookId);
      setSelectedNotebook(notebookId);
      setSelectedNote(null);
    }

    const handleNoteClick = (noteId) => {
      console.log(noteId);
      setSelectedNote(noteId);
    }

    const handleCreateNotebook = () => {
      dummyUser.createNotebook(dummyData[notebookIndex]);
      setNotebookIndex((prevIndex) => prevIndex + 1);
    }

    const handleCreateNote = () => {
      console.log('Create note');

      //dummyUser.notebooks[selectedNotebook].createNote(createNote());
    }

    const currentNotebook = dummyUser.notebooks.find((notebook) => notebook.notebook_id === selectedNotebook);
    const currentNotes = currentNotebook ? currentNotebook.notes : [];
    const activeNote = currentNotes.find((note) => note.note_id === selectedNote);

    return (
        <div className="notes-page-container">
            <div className="text-modifiers">This will be where the RTF modifiers go</div>

            <div className="notes-content">
                {/* 1) Notebook selector*/}
                <div className="notebooks-section">
                    {dummyUser.notebooks.map((notebook) => (
                        <Notebook
                          key={notebook.notebook_id}
                          notebook={notebook}
                          onClick={() => handleNotebookClick(notebook.notebook_id)}
                          selected={notebook.notebook_id === selectedNotebook} // Check if this notebook is selected
                        />
                    ))
                    }
                    <button className='add-notebooks-button'
                      onClick={() => handleCreateNotebook()}
                    >+</button>
                </div>

                {/* 2) Specific note selector. This should only appear once you select a note. */}
                <div className="notes-section">
                    {currentNotes.map((note) => (
                      <Note
                        key={note.note_id}
                        note={note}
                        onClick={() => handleNoteClick(note.note_id)}
                        selected={note.note_id === selectedNote}
                      />
                    ))}
                  <button className='add-notebooks-button'
                      onClick={() => handleCreateNote()}
                    >+</button>
                </div>

                {/* 3) Section where you actually edit / write the note.*/}
                <div className="active-note-section">
                  <ActiveNote
                    activeNote={activeNote}
                    //handleContentChange={handleContentChange}
                  />
                </div>
            </div>

        </div>
    )
}

export default NotesPage;
