import '../styles/components/Notebook.css'
import gardevoirSprite from '../assets/gardevoirSprite.png';
import { useEffect, useState } from 'react';


// Props:
// 1) notebook = The specific notebook to be rendered.
function Notebook({notebook, handleNotebookClick, selected}) {
    let selected_class = "";
    if (selected){
        selected_class = "selected"
    }

    const [isRenaming, setIsRenaming] = useState(false);
    const [notebookName, setNotebookName] = useState(notebook.name);

    useEffect(() => {setNotebookName(notebook.name)}, []);

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
                onChange={e => {
                    setNotebookName(e.target.value);
                }}
                value={notebookName}
                />

            ):
                (
                    <span>{notebookName}</span>
                )
            }
            </div>
            <div className="notebook-img">
                <img src={"PLACEHOLDER: notebook.sprite"} alt="" /> {/* Future: Should be able to handle multiple sprites. */}
            </div>
            <button className="notebook-rename" onClick={() => setIsRenaming(!isRenaming)}>Rename</button>
        </div>
    )
}

// To-do
// Props validation once we have real data.

export default Notebook;
