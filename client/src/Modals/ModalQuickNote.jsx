import { useContext } from "react";
import "../styles/Modals/ModalQuickNote.css"
import ReactQuill from 'react-quill';
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
const dbUrl = import.meta.env.VITE_DB_URL;
import axios from "axios";

function ModalQuickNote({userData, handleClose}){
    const [noteTitle, setNoteTitle] = useState("")
    const [noteContent, setNoteContent] = useState("")

    const handleTitleChange = (event) => {
        setNoteTitle(event.target.value);
    }

    const handleNoteChange = async(value) => {
        setNoteContent(value);
    }

    const handleQuicknoteSave = async(value) => {
        handleClose();
        const postData = {
            title: noteTitle,
            content: noteContent,
            notebook_id: "" // whichever note they want to save it in. 
        }
        try{
            await axios.post(dbUrl + "/saveQuickNote", postData)
        }
        catch(e) {
            console.error("Error saving quicknote:", e)
        }
        
    }

    return(
        <div id="modal-quicknote-container">
            <div className="modal-title">
                Quicknote
            </div>

            <div className="quicknote-editor">
                <input type="text" id="quicknote-title-input"  onChange={handleTitleChange} placeholder="Note Title..."/>
                <ReactQuill
                    theme="snow"
                    value={noteContent}
                    onChange={handleNoteChange}
                />
            </div>

            <div className="modal-quicknote-btn-container">
                <button className="modal-close-btn" onClick={handleClose}>
                    Cancel
                </button>
                <button className="btn-confirm-quicknote" onClick={handleQuicknoteSave}>
                    Save
                </button>
            </div>

        </div>
    )

}

export default ModalQuickNote
