import '../styles/components/Notebook.css'

// Props:
// 1) notebook = The specific notebook to be rendered.
function Notebook({notebook, handleNotebookClick, selected}) {
    let selected_class = "";
    if (selected){
        selected_class = "selected"
    }

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
            <div className="notebook-name">{notebook.name}</div>
            <div className="notebook-img">
                <img src="" alt="" /> {/* Future: Should be able to handle multiple sprites. */}
            </div>
        </div>
    )
}

// To-do
// Props validation once we have real data.

export default Notebook;
