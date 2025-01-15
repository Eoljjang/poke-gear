import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../styles/components/RecentNotes.css'
import { formatDate } from '../functions/Helpers';

function RecentNotes(){
    const [userData] = useOutletContext();
    const navigate = useNavigate();
    const location = useLocation();

    /*onClick, navigate to: http://localhost:5173/app/notes?userEmail=n&notebook_id=1&note_id=1 */
    const handleNavigate = (notebook_id, note_id) => {
        // For URL handling.
        const queryParams = new URLSearchParams(location.search);
        const userEmail = queryParams.get("userEmail");

        console.log("Navigate to userEmail:", userEmail, ", notebook_id: ", notebook_id, ", note_id:", note_id);
        const url = `/app/notes?userEmail=${userEmail}&notebook_id=${notebook_id}&note_id=${note_id}`;
        navigate(url, {selectedNotebook: notebook_id}); // I need it to also OPEN the note. IE: set the selected states for each notebook :(())
    }

    const output = [] // Array that looks like: [{notebook_id: X, note_id: X, last_edited: X, content: X}, ...]
    userData.forEach((notebook) => {
        notebook.notes.forEach((note) => {
            output.push({
                notebook_name: notebook.name,
                notebook_id: notebook.notebook_id,

                note_name: note.title,
                note_id: note.note_id,

                last_edited: note.last_edited,
                content: note.content
            })
        })
    })

    // Show the top 5 most recently edited IF the length of the array is greater than 5.
    let top5Recent = []
    if (output.length > 0){
        output.forEach((item) => {
            output.sort((current, next) => current.last_edited - next.last_edited) // Sorts it in descending order.

            // Grab the top 5 most recent items. If there are less than 5 notes, then it'll grab it all.
            top5Recent = output.slice(0, 5);
        })
    }

    return(
        <div className="recent-notes-container">
            <div className="recent-notes-title">
                <strong>Recent Notes</strong>
            </div>
            {top5Recent.map((item) => {
                // Display a recent-note-item. Show the following
                // 1) notebook_name > note_name
                // 2) last edited
                // 3) a short preview of the content
                return <div key={item.note_id} className='recent-note-item' onClick={() => handleNavigate(item.notebook_id, item.note_id)}>
                    <div className="note-name">{item.note_name}</div>

                    <div className="details-container">
                        <div className="notebook-name"><i>{item.notebook_name}</i></div>
                        <div className="recent-last-edited"><i>{formatDate(item.last_edited)}</i></div>
                    </div>
                </div>;
            })}
        </div>
    )
}

export default RecentNotes;
