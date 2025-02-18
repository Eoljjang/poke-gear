import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from '../styles/components/RecentNotes.module.css'
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
                content: note.content,

                notebook_sprite: notebook.notebook_sprite,
                note_sprite: note.note_sprite,

                tag: note.tag

            })
        })
    })

    // Show the top 5 most recently edited IF the length of the array is greater than 5.
    let top5Recent = []
    if (output.length > 0) {
        // Sort the array by `last_edited` in descending order
        output.sort(function(a, b){
            return new Date(b.last_edited) - new Date(a.last_edited)
        })

        // Grab the top 5 most recent items, or all if there are fewer than 5
        top5Recent = output.slice(0, 5);
    }

    return(
        <div className={styles["recent-notes-container"]}>
            <div className={styles["recent-notes-title"]}>
                <strong>Recent Notes</strong>
            </div>
            {top5Recent.map((item) => {
                // Display a recent-note-item. Show the following
                // 1) notebook_name > note_name
                // 2) last edited
                // 3) a short preview of the content
                return <div key={item.note_id} className={styles['recent-note-item']} onClick={() => handleNavigate(item.notebook_id, item.note_id)}>
                    <div className={styles["note-container"]}>
                        <div className={styles["note-name"]}>{item.note_name}</div>
                        {item.tag && (
                            <div className={styles["note-tag"]}>
                                {item.tag}
                            </div>
                        )}
                        
                    </div>

                    
                    <div className={styles["details-container"]}>
                        <img className={styles["sprite-img"]} alt="" src={item.note_sprite}/>
                        <div>
                            <div className={styles["notebook-name"]}><i>{item.notebook_name}</i></div>
                            <div className={styles["recent-last-edited"]}><i>{formatDate(item.last_edited)}</i></div>
                        </div>
                        
                    </div>
                </div>;
            })}
        </div>
    )
}

export default RecentNotes;
