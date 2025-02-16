// Modal.js

import React from "react";
import { useState, useCallback } from "react";
import styles from "../styles/Modals/ModalSprite.module.css"
import axios from "axios";
const dbUrl = import.meta.env.VITE_DB_URL;
import {debounce} from 'lodash';

const ModalSprite = ({onClose, children, selectedNotebook, selectedNote }) => {
    const [search, setSearch] = useState("")
    const [spriteUrls, setSpriteUrls] = useState([])
    const [error, setError] = useState("")
    const handleSearchChange = useCallback(
        debounce(async (e) => {
            const newSearch = e.target.value.trim();
            setSearch(newSearch);

            const postData = {
                query: newSearch, // Use the updated search value
            };

            try {
                const response = await axios.post(`${dbUrl}/searchPokeApi`, postData);
                console.log("api:", response.data);
                setSpriteUrls(Object.values(response.data))
            } catch (e) {
                setSpriteUrls([]); // Clear previous results
            }
        }, 500), // 500ms debounce time
        []
    );

    const handleSpriteSelect = () => {
        // When user selects a sprite. it'll set it here.
    }
    return (
        <div className={styles["modal-sprite-wrapper"]}>
            <div className={styles["modal-sprite-container"]}>
                <button className={styles["modal-close-btn"]} onClick={onClose}>Close</button>
                <p>Selected Notebook: {selectedNotebook}</p>
                <p>Selected Note:{selectedNote}</p>
                <input type="text" className={styles["search"]} onChange={handleSearchChange}/>
                <div className={styles["sprite-content"]}>
                    {/* If search failed: */}
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    {/* Else, it'll diplay the sprites*/}
                    {spriteUrls.map((url, index) => (
                        <img key={index} src={url} alt={`Sprite ${index}`} />
                    ))}
                </div>

            </div>
        </div>

    );
    }


export default ModalSprite;
