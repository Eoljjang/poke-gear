import { useState } from "react";
function QuickNote(){
    const [QuickNote, setQuickNote] = useState([]); // State of the quick note content.

    // Future feature: Logic to create a quick note.

    return(
        <div className="quicknote-container">
            I am a quick note.
        </div>
    )
}

export default QuickNote;
