import { useState } from 'react'
import '../styles/components/RecentNotes.css'

function RecentNotes(){
    const [RecentNotes, setRecentNotes] = useState([]); // The state of the current recent notes.

    // Future Feature: Logic to grab the most recent notes.

    return(
        <div className="recent-notes-container">
            Recent Notes
        </div>
    )
}

export default RecentNotes;
