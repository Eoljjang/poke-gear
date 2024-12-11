// This component is for having a custom menu pop up when you right click a notebook.
// This component will handle both right-clicking a notebook and right-clicking a note.
function ContextMenu({clickedItem, posx, posy, handleContextMenuOptionClick}){
    if(clickedItem.notebook_id){
        console.log("Notebook right clicked.");
    }
    else if (clickedItem.note_id){
        console.log("Note right clicked.");
    }
    console.log(posx, posy);
    return(
        <div
            style={{
                position: 'absolute',
                top: posx,
                left: posy,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                padding: '10px',
                zIndex: 1000,
            }}
        >
            hi

        </div>
    )
}

export default ContextMenu
