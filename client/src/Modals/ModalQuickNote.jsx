import { useContext } from "react";
import "../styles/Modals/ModalQuickNote.css"
import ReactQuill from 'react-quill';
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
const dbUrl = import.meta.env.VITE_DB_URL;
import axios from "axios";
import {v4 as uuidv4} from 'uuid';

function ModalQuickNote({userData, setUserData, handleClose}){
    const [noteTitle, setNoteTitle] = useState("")
    const [noteContent, setNoteContent] = useState("")
    const [selectedNotebook, setSelectedNotebook] = useState(null);
    const queryParams = new URLSearchParams(location.search);
    const userEmail = queryParams.get("userEmail");

    const handleTitleChange = (event) => {
        setNoteTitle(event.target.value);
    }

    const handleNoteChange = async(value) => {
        setNoteContent(value);
    }

    const handleQuicknoteSave = async(value) => {
        // Checks that note title and note content can not be empty.
        if (noteTitle.trim() === "" || noteContent.trim() === ""){
            alert("Please add a title and ensure the note content is not empty.");
        }
        else{
            handleClose();
            const newNote = {
                note_id: uuidv4(),
                title: noteTitle,
                content: noteContent,
                note_date: new Date().toISOString(),
                last_edited: new Date().toISOString()
            }

            setUserData((prevData) =>
                prevData.map((notebook) => {
                  return notebook.notebook_id === selectedNotebook
                    ? { ...notebook, notes: [...notebook.notes, newNote] }
                    : notebook;
                })
              );

        }
    }
    const handleNotebookSelect = (e) => {
        setSelectedNotebook(e.target.value)

    }
    return(
        <div id="modal-quicknote-container">
            <div className="modal-title">
                Quicknote
            </div>

            <form action="">
                <label htmlFor="select-notebook">Select a Notebook: </label>
                <select name="select-notebook" id="select-notebook-dropdown" onChange={handleNotebookSelect}>
                    <option value="none" selected>
                        None
                    </option>
                    {
                        userData.map((item) => (
                            <option key={item.notebook_id} value={item.notebook_id}>
                                {item.name}
                            </option>
                        ))
                    }
                </select>
            </form>

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
