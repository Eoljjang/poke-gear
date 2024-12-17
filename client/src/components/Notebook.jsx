import '../styles/components/Notebook.css'
import gardevoirSprite from '../assets/gardevoirSprite.png';
import { useEffect, useState, useRef } from 'react';


// Props:
// 1) notebook = The specific notebook to be rendered.
function Notebook({
    notebook,
    handleNotebookClick,
    selected,
    isRenaming,
    renameValue,
    onRenameChange,
    handleRenameUpdate
})
    {
    let selected_class = "";
    if (selected){
        selected_class = "selected"
    }

    const inputRef = useRef(null);

    useEffect(() => {
        if (isRenaming){
            inputRef.current.focus();
            inputRef.current.select();
        }

    }, [isRenaming]);

    return(
        <div className={`notebook-item ${selected_class}`}
            onClick={(e) => {
                handleNotebookClick(e, notebook.notebook_id)
            }}
            onContextMenu={(e) => {
                handleNotebookClick(e, notebook.notebook_id)
                e.preventDefault(); // Prevents default browser contextmenu.
            }}
        >
            <div className="notebook-name">
            {isRenaming ? (

                <input
                className="notebook-name-input"
                ref={inputRef}
                value={renameValue}
                onChange={e => {
                    onRenameChange(e.target.value);
                }}
                onBlur={handleRenameUpdate}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleRenameUpdate();
                    }
                }}
                />

            ):
                (
                    <span>{notebook.name}</span>
                )
            }
            </div>
            <div className="notebook-img">
                <img src={"PLACEHOLDER: notebook.sprite"} alt="" /> {/* Future: Should be able to handle multiple sprites. */}
            </div>
        </div>
    )
}

// To-do
// Props validation once we have real data.

export default Notebook;
