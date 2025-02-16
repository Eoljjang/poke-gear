// Modal.js

import React from "react";
import { useState } from "react";
import styles from "../styles/Modals/ModalSprite.module.css"
import axios from "axios";
const dbUrl = import.meta.env.VITE_DB_URL;

const ModalSprite = ({onClose, children, selectedNotebook, selectedNote }) => {
    const [search, setSearch] = useState("")
    const handleSearchChange = async(e) => {
        setSearch(e.target.value);
        const postData = {
            query: search // Live searching
        }

        // Query poke-api for sprite
        axios.post(dbUrl + "/searchPokeApi", postData)
        .then(response => {
            console.log(response);

        })
        .catch(e => {
            if (e.response) {
                console.error(e.response.data.message);  // Specific error message from the server
            } else {
                console.error("Error: ", e.message); // Fallback for other errors (e.g., network issues)
            }
        })
    }
    return (
        <div className={styles["modal-sprite-wrapper"]}>
            <div className={styles["modal-sprite-container"]}>
                <button className={styles["modal-close-btn"]} onClick={onClose}>Close</button>
                <p>Selected Notebook: {selectedNotebook}</p>
                <p>Selected Note:{selectedNote}</p>
                <input type="text" className={styles["search"]} onChange={handleSearchChange}/>
                <div className={styles["sprite-content"]}>
                    sprite goes here!
                </div>

            </div>
        </div>

    );
    }


export default ModalSprite;
