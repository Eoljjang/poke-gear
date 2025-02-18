import styles from "../styles/views/NotesPage.module.css";
import Notebook from "../components/Notebook";
import Note from "../components/Note";
import ActiveNote from "../components/ActiveNote";
import ContextMenu from "../components/ContextMenu";
import Toolbar from "../components/Toolbar.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "react-quill/dist/quill.snow.css"; // Import Quill's styling.
import axios from "axios";
import {debounce} from 'lodash';
import SyncingIcon from "../components/SyncingIcon.jsx";
import ModalSprite from "../Modals/ModalSprite.jsx";
import {Resizable} from 'react-resizable';
import {v4 as uuidv4} from 'uuid';

function NotesPage() {
  // ------------- STATES -------------
  const [userData, setUserData, syncing] = useOutletContext();
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
  });
  const [rightClickedItem, setRightClickedItem] = useState(null); 
  const [renamingNotebookId, setRenamingNotebookId] = useState(null);
  const [renamingNoteId, setRenamingNoteId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [isBtnDisabled, setIsBtnDisabled] = useState(false); // Whether or not add btn is enabled. This is so that user can't spam add the add btn and overload db.
  const [spriteModalOpen, setSpriteModalOpen] = useState(false);
  // ------------- STATES -------------

  // ------------- DATA -------------
  const currentNotebook = userData.find( // Current notebook = selected one.
    (notebook) => notebook.notebook_id === selectedNotebook
  );
  const currentNotes = currentNotebook ? currentNotebook.notes : []; // The notes for the selected notebook.
  const activeNote = currentNotes.find((note) => note.note_id === selectedNote); // Find the active note based on the note_id.

  // URL
  const navigate = useNavigate();
  const locationUrl = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("userEmail");
  // ------------- DATA -------------

  // ------------- USE EFFECTS  -------------
  useEffect(() => { // When the URL changes, it updates the selected notebook & note. IE: when you navigate here from RecentNotes.jsx.
    const url_notebook_id = queryParams.get("notebook_id");
    const url_note_id = queryParams.get("note_id");
    setSelectedNote((url_note_id))
    setSelectedNotebook((url_notebook_id));

    setIsVisible({
      notebooks: true,
      notes: true,
    });
  }, [locationUrl])
  // ------------- USE EFFECTS  -------------

  // ------------- HANDLERS  -------------
  const handleNotebookClick = (e, notebook) => { // Accepts a 'notebook' object.
    if (e.type === "click") {
      console.log("Left clicked notebook:", notebook.notebook_id);
      setSelectedNotebook(notebook.notebook_id);
      setSelectedNote(null); // Reset note selection
      // Make sure we sure the notes lol.
      setIsVisible({
        notebooks: true,
        notes: true,
      });

      // Handle URL changes
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('notebook_id', notebook.notebook_id); // append to current url.
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true }); // set the new url.


    } else if (e.type === "contextmenu") {
      console.log("Right clicked notebook:", notebook.notebook_id);
      setRightClickedItem(notebook);
      setContextMenu({
        visible: true,
        clickedItem: notebook,
        x: e.pageX,
        y: e.pageY,
      });
    }
  };

  const handleNoteClick = (e, note) => { // Accepts a 'note' object.
    if (e.type === "click") {
      console.log("Left clicked note:", note.note_id);
      console.log("Type of clicked note:", typeof(note.note_id))
      setSelectedNote(note.note_id);

      // Handle URL changes
      const searchParams = new URLSearchParams(location.search);
      searchParams.set('note_id', note.note_id); // append to current url.
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true }); // set the new url.

    } else if (e.type === "contextmenu") {
      console.log("Right clicked note:", note.note_id);
      setRightClickedItem(note);
      setContextMenu({
        visible: true,
        clickedItem: note,
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

    if (action === "menu-add-sprite"){
      handleOpenModalSprite(); // open the modal.
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
            last_edited: new Date(),
          })),
        }))
      );
      setRenamingNoteId(null);
      setRenameValue("");
    }
  };

  const handleCreateNotebook = () => {
    setIsBtnDisabled(true); // Disable the add btn.
    const newNotebook = {
      notebook_id: uuidv4(),//userData.length + 1,
      name: `Untitled Notebook`,
      notes: [],
      notebook_sprite: "",
    };
    setUserData([...userData, newNotebook]);
    setTimeout(() => setIsBtnDisabled(false), 1000); // Change btn back to enabled after 1 second.
  };

  const handleCreateNote = () => {
    if (currentNotebook) {
      setIsBtnDisabled(true); // Disable the add btn.
      const newNote = {
        note_id: uuidv4(),//currentNotebook.notes.length + 1,
        title: `Untitled Note`,
        content: "",
        note_date: new Date(), // have to assign the date locally.
        last_edited: new Date(),
        note_sprite: ""
      };
      setUserData((prevData) =>
        prevData.map((notebook) =>
          notebook.notebook_id === selectedNotebook
            ? { ...notebook, notes: [...notebook.notes, newNote] }
            : notebook
        )
      );
      // Change the btn state back to enabled after 1 second.
      setTimeout(() => setIsBtnDisabled(false), 1000);
    }

  };

  const handleSpriteSelect = (spriteUrl, rightClickedItem) => {
    setUserData((prevData) =>
        prevData.map((notebook) => {
            // If the right-clicked item is a notebook, update its sprite
            if (notebook.notebook_id === rightClickedItem.notebook_id) {
                return { ...notebook, notebook_sprite: spriteUrl };
            }

            // Otherwise, check if it's a note inside this notebook
            const updatedNotes = notebook.notes.map((note) =>
                note.note_id === rightClickedItem.note_id
                    ? { ...note, note_sprite: spriteUrl } // Update the note sprite
                    : note
            );

            return { ...notebook, notes: updatedNotes };
        })
    );
  };

  const handleSpriteRemove = (rightClickedItem) => {
    setUserData((prevData) =>
        prevData.map((notebook) => {
            // If the right-clicked item is a notebook, remove its sprite
            if (notebook.notebook_id === rightClickedItem.notebook_id) {
                return { ...notebook, notebook_sprite: "" };
            }

            // Otherwise, check if it's a note inside this notebook
            const updatedNotes = notebook.notes.map((note) =>
                note.note_id === rightClickedItem.note_id
                    ? { ...note, note_sprite: "" } // Remove the note sprite
                    : note
            );

            return { ...notebook, notes: updatedNotes };
        })
    );
};

  const handleNoteTitleUpdate = (noteId, updatedTitle) => {
    setUserData((prevData) =>
      prevData.map((notebook) =>
        notebook.notebook_id === selectedNotebook
          ? {
              ...notebook,
              notes: notebook.notes.map((note) =>
                note.note_id === noteId
                  ? {
                    ...note,
                    title: updatedTitle,
                    //last_edited: `${formattedDate} at ${formattedTime}`,
                    last_edited: new Date(),
                  }
                  : note

              ),
            }
          : notebook
      )
    );
  };

  const handleNoteUpdate = debounce((noteId, updatedContent) => {
    setUserData((prevData) =>
      prevData.map((notebook) =>
        notebook.notebook_id === selectedNotebook
          ? {
              ...notebook,
              notes: notebook.notes.map((note) =>
                note.note_id === noteId
                  ? {
                    ...note,
                    content: updatedContent,
                    //last_edited: `${formattedDate} at ${formattedTime}`,
                    last_edited: new Date()
                  }
                  : note
              ),
            }
          : notebook
      )
    );

  }, 1000); // 1s debounce between each keystroke.

  const onClickCollapseNotebooks = () => {
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

  const handleOpenModalSprite = () => {
    setSpriteModalOpen(true);
  }

  const handleCloseModalSprite = () => {
    setSpriteModalOpen(false);
  }
  // ------------- HANDLERS  -------------

  return (
    <>
      <div
        className={`${styles.overlay} ${contextMenu.visible ? styles.open : ""}`}
        onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
      />

      <div className={styles["notes-page-container"]}>
        <Toolbar
          onClickCollapseNotebooks={onClickCollapseNotebooks}
          onClickCollapseNotes={onClickCollapseNotes}
        />
        <div className={styles["notes-content"]}>
          {/* 1) Notebook Selector */}
          {isVisible.notebooks && (
            <div className={styles["notebooks-section"]}>
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
                  sprite={notebook.notebook_sprite}
                />
              ))}
              <button
                className={styles["add-notebooks-button"]}
                onClick={handleCreateNotebook}
                disabled={isBtnDisabled}
              >
                +
              </button>
            </div>
          )}

          {/* 2) Note Selector */}
          {isVisible.notes && (
            <div className={styles["notes-section"]}>
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
                  sprite={note.note_sprite}
                />
              ))}

              <button
                className={styles["add-notebooks-button"]}
                onClick={handleCreateNote}
                disabled={isBtnDisabled}
              >
                +
              </button>
            </div>
          )}

          {/* 3) Active Note Editor */}
            <div className={styles["active-note-section"]}>
              {syncing && (
                <SyncingIcon/>
              )}
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

      {/* Modal: Add a sprite. Only appears when state is true. */}
      {spriteModalOpen && (
          <ModalSprite
            onClose={handleCloseModalSprite}
            rightClickedItem={rightClickedItem}
            handleSpriteSelect={handleSpriteSelect}
            handleSpriteRemove={handleSpriteRemove}
          >
          </ModalSprite>
      )}

    </>
  );
}

export default NotesPage;
