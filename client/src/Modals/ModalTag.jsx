// Modal.js

import React from "react";
import { useState, useCallback } from "react";
import styles from "../styles/Modals/ModalTag.module.css"
import axios from "axios";
const dbUrl = import.meta.env.VITE_DB_URL;
import {debounce} from 'lodash';

const ModalTag = ({onClose, rightClickedItem, handleTagRemove, handleTagSelect }) => {
    const [search, setSearch] = useState("")
    const [spriteUrls, setSpriteUrls] = useState([])
    const [highlightedTag, setHighlightedTag] = useState(null) // holds the selected sprite url.
    const tags = ["general", "matchup", "decklist", "review", "cup", "challenge"]

    const handleHighlightTag = (selectedTag) => {
        setHighlightedTag(selectedTag)
    }

    return (
        <div className={styles["modal-tag-wrapper"]}>
            <div className={styles["modal-tag-container"]}>
                <div className={styles["header"]}>
                    <h2>Edit tag</h2>
                    <button className={styles["modal-close-btn"]} onClick={onClose}>&#10006;</button>
                </div>

                <div className={styles.content}>
                    {tags.map((tag) => (
                        <div 
                            className={`${styles["tag-item"]} ${highlightedTag === tag ? styles["highlighted-tag"] : ""}`}
                            key={tag}
                            onClick={() => handleHighlightTag(tag)}
                        >
                            {tag}
                        </div>
                    ))}
                </div>

                <div className={styles["btn-container"]}>
                    {/* If there's a tag set - give option to remove it. */}
                    {(rightClickedItem?.tag) && (
                        <button className={styles["remove-tag-btn"]} onClick={() => handleTagRemove(rightClickedItem)}>Remove Tag</button>
                    )}

                    <button className={styles["confirm-add-tag-btn"]} onClick={() => handleTagSelect(highlightedTag, rightClickedItem)}>Confirm</button>
                </div>


            </div>
        </div>
    );
    }


export default ModalTag
