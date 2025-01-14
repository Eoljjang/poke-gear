import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../styles/components/RecentNotes.css'


function RecentNotes(){
    const [userData] = useOutletContext();
    const output = [] // Array that looks like: [{notebook_id: X, note_id: X, last_edited: X, content: X}, ...]
    userData.forEach((notebook) => {
        notebook.notes.forEach((note) => {
            output.push({
                notebook_id: notebook.notebook_id,
                note_id: note.note_id,
                last_edited: note.last_edited,
                content: note.content
            })
        })
    })

    // Show the top 5 most recently edited IF the length of the array is greater than 5.
    if (output){
        output.forEach((item) => {
            console.log(item.last_edited);  // I realized this is saved to the db as a fucking string so I need to fix it.
        })
    }

    return(
        <div className="recent-notes-container">
            Recent Notes
        </div>
    )
}

export default RecentNotes;
