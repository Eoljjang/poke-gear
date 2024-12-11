// This component is for having a custom menu pop up when you right click a notebook.
// This component will handle both right-clicking a notebook and right-clicking a note.
function ContextMenu(clickedItem){
    if(clickedItem.notebook_id){
        console.log("Notebook right clicked.");
    }
    else if (clickedItem.note_id){
        console.log("Note right clicked.");
    }
}
