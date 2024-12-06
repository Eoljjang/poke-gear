import '../styles/components/Notebook.css'

// Props:
// 1) notebook = The specific notebook to be rendered.
function Notebook({notebook, onClick, selected}) {
    let selected_class = "";
    if (selected){
        console.log('selected');
        selected_class = "notebook-item-selected"
    }
    else{
        selected_class = "notebook-item-unselected"
    }
    return(
        <div className={selected_class} onClick={onClick}>
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
