import { useContext } from "react";
import "../styles/Modals/ModalQuickNote.css"
import ReactQuill from 'react-quill';
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
function ModalQuickNote({userData, handleClose}){
    const [noteTitle, setNoteTitle] = useState("")

    const handleTitleChange = (event) => {
        setNoteTitle(event.target.value);

    }

    const handleQuicknoteSave = async(value) => {
        console.log(userData);
        handleClose();
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
