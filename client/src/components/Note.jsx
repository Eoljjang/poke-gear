import '../styles/components/Note.css'

// Props:
// 1) notebook = The specific notebook to be rendered.
function Note({note, selected, handleNoteClick}) {
    let selected_class = ""
    if (selected){
        selected_class = "selected";
    } 
    return(
        <div className={`note-item ${selected_class}`} onClick={(e) => {handleNoteClick(e, note.note_id)}}>
            <div className="note-name">{note.title}</div>
            <div className="note-img">
                <img src="" alt="" /> {/* Future: Should be able to handle multiple sprites. */}
            </div>
        </div>
    )
}

// To-do
// Props validation once we have real data.

export default Note;
