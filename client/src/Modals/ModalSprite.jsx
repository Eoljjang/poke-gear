// Modal.js

import React from "react";
import { useState, useCallback } from "react";
import styles from "../styles/Modals/ModalSprite.module.css"
import axios from "axios";
const dbUrl = import.meta.env.VITE_DB_URL;
import {debounce} from 'lodash';

const ModalSprite = ({onClose, rightClickedItem, handleSpriteSelect, handleSpriteRemove }) => {
    const [search, setSearch] = useState("")
    const [spriteUrls, setSpriteUrls] = useState([])
    const [highlightedSprite, setHighlightedSprite] = useState(null) // is set to be the img key.
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
    
    return (
        <div className={styles["modal-sprite-wrapper"]}>
            <div className={styles["modal-sprite-container"]}>
                <div className={styles["header"]}>
                    <h2>Add a Sprite</h2>
                    <button className={styles["modal-close-btn"]} onClick={onClose}>&#10006;</button>
                </div>

                <div className={styles.content}>
                    <p className={styles.hint}><i>Separate spaces with a hyphen. E.g: iron-hands</i></p>
                    <input type="text" className={styles["search"]} onChange={handleSearchChange}/>
                    <div className={styles["sprite-content"]}>
                        {/* If search failed: */}
                        {error && <p style={{ color: "red" }}>{error}</p>}

                        {/* Else, it'll diplay the sprites*/}
                        {spriteUrls.map((url, index) => (
                            <img key={index} src={url} alt={`Sprite ${index}`} onClick={() => handleSpriteSelect(url, rightClickedItem)}/>
                        ))}
                    </div>
                </div>

                <div className={styles["btn-container"]}>
                    {/* If there's a sprite set - give option to remove it. */}
                    {(rightClickedItem?.notebook_sprite || rightClickedItem?.note_sprite) && (
                        <button className={styles["remove-sprite-btn"]} onClick={() => handleSpriteRemove(rightClickedItem)}>Remove Sprite</button>
                    )}

                    <button className={styles["confirm-add-sprite-btn"]}>Confirm</button>
                </div>


            </div>
        </div>

    );
    }


export default ModalSprite;
