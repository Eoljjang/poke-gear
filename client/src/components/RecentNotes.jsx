import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../styles/components/RecentNotes.css'
import { formatDate } from '../functions/Helpers';
function RecentNotes(){
    const [userData] = useOutletContext();
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
            console.log(item.last_edited);  // I realized this is saved to the db as a fucking string so I need to fix it.
            output.sort((current, next) => current.last_edited - next.last_edited) // Sorts it in descending order.

            // Grab the top 5 most recent items. If there are less than 5 notes, then it'll grab it all.
            top5Recent = output.slice(0, 5);
        })
    }
    console.log(top5Recent);

    return(
        <div className="recent-notes-container">
            {top5Recent.map((item) => {
                // Display a recent-note-item. Show the following
                // 1) notebook_name > note_name
                // 2) last edited
                // 3) a short preview of the content
                return <div key={item.note_id} className='recent-note-item'>
                    {item.notebook_name}
                    {item.note_name}
                    {formatDate(item.last_edited)}
                </div>;
            })}
        </div>
    )
}

export default RecentNotes;
