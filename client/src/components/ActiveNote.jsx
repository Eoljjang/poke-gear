import "../styles/components/ActiveNote.css";
import React, { act, useState } from 'react';
import ReactQuill from 'react-quill';
import Quill from "quill";
import { useRef, useEffect } from "react";
import '../styles/views/TextEditor.css'; // Import Quill's styling.

function ActiveNote({activeNote, toolbarRef, handleNoteUpdate}){
    // References to toolbar and quill editor.
    const editorRef = useRef(null);
    const [editor, setEditor] = useState(null);

    useEffect(() => {
        // Initialize the Quill editor once the component is mounted
        if (editorRef.current && toolbarRef.current && !editor) {
          const quill = new Quill(editorRef.current, {
            modules: {
              toolbar: toolbarRef.current, // Use the passed toolbar ref
            },
            theme: 'snow', // delete this if you we ever want to write a custom toolbar since the theme overrides custom styling.
          });
          if (activeNote && activeNote.content) {
            quill.root.innerHTML = activeNote.content; // Set the HTML content
          }

          setEditor(editor); // instantiate the editor.

          // Listen for changes and update the data
          quill.on("text-change", () => {
            const updatedContent = quill.root.innerHTML; // Get what user wrote into the editor.
            if (activeNote && handleNoteUpdate) {
                handleNoteUpdate(activeNote.id, updatedContent);
            }
          })
        }
      }, [toolbarRef, activeNote, editor]); // Reinitialize when toolbarRef changes

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
                    {/* Quill Editor */}
                    <div ref={editorRef} id="editor">
                    </div>
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
