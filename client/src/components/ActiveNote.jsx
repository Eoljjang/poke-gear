import "../styles/components/ActiveNote.css";
import React, { act, useState } from 'react';
import ReactQuill from 'react-quill';
import Quill from "quill";
import { useRef, useEffect } from "react";
import '../styles/views/TextEditor.css'; // Import Quill's styling.
import Editor from "quill/core/editor";

function ActiveNote({activeNote, handleNoteUpdate}){
    const handleChange = (value) => {
        if (activeNote.content !== value) {
            handleNoteUpdate(activeNote.note_id, value); // Only call the update handler if content changes.
        }
    }
    if (activeNote){
        return(
            <div className="test">
                <div className="active-note-heading">
                    <div className="active-note-header">
                        {activeNote.title}
                    </div>
                    <div className="active-note-subheader">
                        Date created here.
                    </div>
                </div>

                <div className="active-note-content">
                    <ReactQuill /* Do not give this an id otherwise the onChange stops working. */
                        value={activeNote.content}
                        onChange={handleChange}
                        theme="snow"
                    />
                </div>
            </div>
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
