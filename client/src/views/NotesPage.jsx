import "../styles/views/NotesPage.css";
import Notebook from "../components/Notebook";
import Note from "../components/Note";
import ActiveNote from "../components/ActiveNote";
import ContextMenu from "../components/ContextMenu";
import Toolbar from "../components/Toolbar.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import Quill's styling.

function NotesPage() {
  // Single source of truth
  //const [userData, setUserData] = useState(userData);
  const [userData, setUserData] = useOutletContext();
  const [isVisible, setIsVisible] = useState({
    notebooks: true,
    notes: false,
  });
  const [selectedNotebook, setSelectedNotebook] = useState(null); // ID of selected notebook
  const [selectedNote, setSelectedNote] = useState(null); // ID of selected note
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    clickedItem: null,
    x: 0,
    y: 0,
  }); // state of the context menu.
  const [renamingNotebookId, setRenamingNotebookId] = useState(null);
  const [renamingNoteId, setRenamingNoteId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  // Current notebook = selected one.
  const currentNotebook = userData.find(
    (notebook) => notebook.notebook_id === selectedNotebook
  );

  // The notes for the selected notebook.
  const currentNotes = currentNotebook ? currentNotebook.notes : [];

  // Find the active note based on the note_id.
  const activeNote = currentNotes.find((note) => note.note_id === selectedNote);

  // For updating the url
  const navigate = useNavigate();
  const location = useLocation();

  // Handlers
  const handleNotebookClick = (e, notebookId) => {
    if (e.type === "click") {
      console.log("Left clicked a notebook.");
      setSelectedNotebook(notebookId);
      setSelectedNote(null); // Reset note selection
      // Make sure we sure the notes lol.
      setIsVisible({
        notebooks: true,
        notes: true,
      });

      // Handle URL changes
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('notebook_id', notebookId); // append to current url.
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true }); // set the new url.


    } else if (e.type === "contextmenu") {
      console.log("Right clicked a notebook.");
      setContextMenu({
        visible: true,
        clickedItem: { notebook_id: notebookId },
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  const handleNoteClick = (e, noteId) => {
    console.log(e.button);
    if (e.type === "click") {
      console.log("Left clicked a note.");
      setSelectedNote(noteId);

      // Handle URL changes
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('note_id', noteId); // append to current url.
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true }); // set the new url.

    } else if (e.type === "contextmenu") {
      console.log("Right clicked a note.");
      setContextMenu({
        visible: true,
        clickedItem: { note_id: noteId },
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  const handleContextMenuOptionClick = (action, clickedItem) => {
    console.log(`Selected option: ${action}`);

    // Delete & its a notebook.
    if (action === "menu-delete" && clickedItem.notebook_id) {
      console.log(clickedItem);
      setUserData(
        userData.filter(
          (notebook) => notebook.notebook_id !== clickedItem.notebook_id
        )
      );
    }

    // Delete and its a note.
    else if (action === "menu-delete" && clickedItem.note_id) {
      setUserData(
        userData.map((notebook) => ({
          ...notebook,
          notes: notebook.notes.filter(
            (note) => note.note_id !== clickedItem.note_id
          ),
        }))
      );
    }

    if (action === "menu-rename" && clickedItem.notebook_id) {
      const notebookToRename = userData.find(
        (nb) => nb.notebook_id === clickedItem.notebook_id
      );
      if (notebookToRename) {
        setRenamingNotebookId(clickedItem.notebook_id);
        setRenameValue(notebookToRename.name);
      }
    } else if (action === "menu-rename" && clickedItem.note_id) {
      const noteToRename = userData
        .find((nb) => nb.notebook_id === selectedNotebook)
        .notes.find((note) => note.note_id === clickedItem.note_id);
      if (noteToRename) {
        setRenamingNoteId(clickedItem.note_id);
        setRenameValue(noteToRename.title);
      }
    }

    // Hide context menu after selection
    setContextMenu({ visible: false, x: 0, y: 0 });
  };

  const handleRenameUpdate = () => {
    if (renamingNotebookId) {
      setUserData((prevData) =>
        prevData.map((notebook) => ({
          ...notebook,
          name:
            notebook.notebook_id === renamingNotebookId
              ? renameValue
              : notebook.name,
        }))
      );
      setRenamingNotebookId(null);
      setRenameValue("");
      return;
    } else if (renamingNoteId) {
      setUserData(
        userData.map((notebook) => ({
          ...notebook,
          notes: notebook.notes.map((note) => ({
            ...note,
            title: note.note_id === renamingNoteId ? renameValue : note.title,
          })),
        }))
      );
      setRenamingNoteId(null);
      setRenameValue("");
    }
  };

  const handleCreateNotebook = () => {
    const newNotebook = {
      notebook_id: userData.length + 1,
      name: `Notebook ${userData.length + 1}`,
      notes: [],
    };
    setUserData([...userData, newNotebook]);
  };

  const handleCreateNote = () => {
    if (currentNotebook) {
      const newNote = {
        note_id: currentNotebook.notes.length + 1,
        title: `New Note`,
        content: "",
        date: "mm/dd/yyyy",
      };
      setUserData((prevData) =>
        prevData.map((notebook) =>
          notebook.notebook_id === selectedNotebook
            ? { ...notebook, notes: [...notebook.notes, newNote] }
            : notebook
        )
      );
    }
  };

  const handleNoteTitleUpdate = (noteId, updatedTitle) => {
    setUserData((prevData) =>
      prevData.map((notebook) =>
        notebook.notebook_id === selectedNotebook
          ? {
              ...notebook,
              notes: notebook.notes.map((note) =>
                note.note_id === noteId
                  ? { ...note, title: updatedTitle }
                  : note
              ),
            }
          : notebook
      )
    );
  };

  const handleNoteUpdate = (noteId, updatedContent) => {
    setUserData((prevData) =>
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

  const onClickCollapseNotebooks = () => {
    console.log("reached");
    if (isVisible.notebooks === true) {
      setIsVisible({
        notebooks: false,
        notes: false,
      });
    } else if (isVisible.notebooks === false) {
      setIsVisible({
        notebooks: true,
        notes: false,
      });
    }
  };

  const onClickCollapseNotes = () => {
    // Clicking on notes-btn when both are collapsed should not do anything.
    if (isVisible.notes === false && isVisible.notebooks === false) {
      console.log(
        "Do nothing as both notebooks & notes are already collapsed."
      );
    } else if (isVisible.notes === true) {
      setIsVisible({
        notebooks: true,
        notes: false,
      });
    } else if (isVisible.notes === false) {
      setIsVisible({
        notebooks: true,
        notes: true,
      });
    }
  };

  const handleDelete = (id) => {
    console.log("Deleted note / notebook:", id);
  };

  return (
    <>
      <div
        className={`notes-page-overlay ${contextMenu.visible ? "open" : ""}`}
        onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
      />

      <div className="notes-page-container">
        <Toolbar
          onClickCollapseNotebooks={onClickCollapseNotebooks}
          onClickCollapseNotes={onClickCollapseNotes}
        />
        <div className="notes-content">
          {/* 1) Notebook Selector */}
          {isVisible.notebooks && (
            <div className="notebooks-section">
              {userData.map((notebook) => (
                <Notebook
                  key={notebook.notebook_id}
                  notebook={notebook}
                  handleNotebookClick={handleNotebookClick}
                  selected={notebook.notebook_id === selectedNotebook}
                  isRenaming={notebook.notebook_id === renamingNotebookId}
                  renameValue={renameValue}
                  onRenameChange={(value) => setRenameValue(value)}
                  handleRenameUpdate={handleRenameUpdate}
                />
              ))}
              <button
                className="add-notebooks-button"
                onClick={handleCreateNotebook}
              >
                +
              </button>
            </div>
          )}

          {/* 2) Note Selector */}
          {isVisible.notes && (
            <div className="notes-section">
              {currentNotes.map((note) => (
                <Note
                  key={note.note_id}
                  note={note}
                  handleNoteClick={handleNoteClick}
                  selected={note.note_id === selectedNote}
                  isRenaming={note.note_id === renamingNoteId}
                  renameValue={renameValue}
                  onRenameChange={(value) => setRenameValue(value)}
                  handleRenameUpdate={handleRenameUpdate}
                />
              ))}

              <button
                className="add-notebooks-button"
                onClick={handleCreateNote}
              >
                +
              </button>
            </div>
          )}

          {/* 3) Active Note Editor */}
          <div className="active-note-section">
            <ActiveNote
              activeNote={activeNote}
              currentNotebook={currentNotebook}
              handleNoteTitleUpdate={handleNoteTitleUpdate}
              handleNoteUpdate={handleNoteUpdate}
            />
          </div>
        </div>
        {/* If there was a right click, then we render the context menu. */}
        {contextMenu.visible && (
          <ContextMenu
            clickedItem={contextMenu.clickedItem}
            posx={contextMenu.x}
            posy={contextMenu.y}
            handleContextMenuOptionClick={handleContextMenuOptionClick}
          />
        )}
      </div>
    </>
  );
}

export default NotesPage;
