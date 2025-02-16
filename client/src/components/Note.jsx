import styles from "../styles/components/Note.module.css";
import { useEffect, useRef } from "react";
// Props:
// 1) notebook = The specific notebook to be rendered.
function Note({
  note,
  selected,
  handleNoteClick,
  isRenaming,
  renameValue,
  onRenameChange,
  handleRenameUpdate,
  selectedSprite
}) {
  let selected_class = "";
  if (selected) {
    selected_class = "selected";
  }

  const inputRef = useRef(null);

  useEffect(() => {
    if (isRenaming) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isRenaming]);

  return (
    <div
      className={`${styles["note-item"]} ${styles[selected_class]}`}
      onClick={(e) => {
        handleNoteClick(e, note.note_id);
      }}
      onContextMenu={(e) => {
        handleNoteClick(e, note.note_id);
        e.preventDefault(); // Prevents default browser contextmenu.
      }}
    >
      <div className={styles["note-name"]}>
        {isRenaming ? (
          <input
            className={styles["note-name-input"]}
            ref={inputRef}
            value={renameValue}
            onChange={(e) => {
              onRenameChange(e.target.value);
            }}
            onBlur={handleRenameUpdate}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRenameUpdate();
              }
            }}
          />
        ) : (
          <span>{note.title}</span>
        )}
      </div>
      <div className={styles["note-img"]}>
        <img src={note.note_sprite} alt="" />{" "}
        {/* Future: Should be able to handle multiple sprites. */}
      </div>
    </div>
  );
}

// To-do
// Props validation once we have real data.

export default Note;
