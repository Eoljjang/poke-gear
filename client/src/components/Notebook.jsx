import styles from "../styles/components/Notebook.module.css";
import gardevoirSprite from "../assets/gardevoirSprite.png";
import { useEffect, useRef } from "react";

// Props:
// 1) notebook = The specific notebook to be rendered.
function Notebook({
  notebook,
  handleNotebookClick,
  selected,
  isRenaming,
  renameValue,
  onRenameChange,
  handleRenameUpdate,
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
      className={`${styles['notebook-item']} ${styles[selected_class]}`}
      onClick={(e) => {
        handleNotebookClick(e, notebook); // passes the notebook object onClick.
      }}
      onContextMenu={(e) => {
        handleNotebookClick(e, notebook);
        e.preventDefault(); // Prevents default browser contextmenu.
      }}
    >
      <div className={styles["notebook-name"]}>
        {isRenaming ? (
          <input
            className={styles["notebook-name-input"]}
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
          notebook.name
        )}
      </div>
      <img src={notebook.notebook_sprite} className={styles["notebook-img"]} alt="" />{" "}
    </div>
  );
}

export default Notebook;
