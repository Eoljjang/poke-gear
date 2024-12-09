import '../styles/components/Note.css'

// Props:
// 1) notebook = The specific notebook to be rendered.
function Note({note, selected, handleNoteClick}) {
    let selected_class = ""
    if (selected){
        selected_class = "selected";
    }
    return(
        <div className={`note-item ${selected_class}`}
            onClick={(e) => {handleNoteClick(e, note.note_id)}}
            onContextMenu={(e) => {
                handleNoteClick(e, note.note_id)
                e.preventDefault(); // Prevents default browser contextmenu.
            }}
        >
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
