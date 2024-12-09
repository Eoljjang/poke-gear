import "../styles/components/ActiveNote.css";
import React, { act, useState } from 'react';
import ReactQuill from 'react-quill';
import Quill from "quill";
import { useRef, useEffect } from "react";
import 'react-quill/dist/quill.snow.css'; // Import Quill's styling.

function ActiveNote({activeNote, toolbarRef}){
    // References to toolbar and quill editor.
    const editorRef = useRef(null);
    useEffect(() => {
        // Initialize the Quill editor once the component is mounted
        if (editorRef.current && toolbarRef.current) {
          const quill = new Quill(editorRef.current, {
            modules: {
              toolbar: toolbarRef.current, // Use the passed toolbar ref
            },
            theme: 'snow', // Set the theme for the editor
          });
          if (activeNote && activeNote.content) {
            quill.root.innerHTML = activeNote.content; // Set the HTML content
          }
        }
      }, [toolbarRef, activeNote]); // Reinitialize when toolbarRef changes

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
                    {/* Quill Editor */}
                    <div ref={editorRef} id="editor">
                    </div>
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
