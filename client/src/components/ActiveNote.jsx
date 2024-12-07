import "../styles/components/ActiveNote.css";
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill's styling.

function ActiveNote({activeNote}){
    if (activeNote){
        return(
            <>
                <div className="active-note-heading">
                    <div className="active-note-header">
                        {activeNote.title}
                    </div>
                    <div className="active-note-subheader">
                        Date created here.
                    </div>
                </div>

                <div className="active-note-content">
                    <ReactQuill
                        theme="snow"
                        value={activeNote.content}
                        //onChange={handleContentChange} // define some sort of onChange function to be passed in. State kept in NotesPage.jsx
                    />
                </div>
            </>
        )
    }
    else{
        return( /* Return an empty page if no note is selected. */
            <>
            
            </>
        )
    }

}

export default ActiveNote;