import { useState } from "react";
import '../styles/components/QuickNote.css'
function QuickNote(){
    const [QuickNote, setQuickNote] = useState([]); // State of the quick note content.

    // Future feature: Logic to create a quick note.

    return(
        <div className="quicknote-container">
            Quick Note
        </div>
    )
}

export default QuickNote;
