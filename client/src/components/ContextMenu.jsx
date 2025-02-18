// This component is for having a custom menu pop up when you right click a notebook.
// This component will handle both right-clicking a notebook and right-clicking a note.
import styles from '../styles/components/ContextMenu.module.css'
import { useRef, useEffect, useState } from 'react';

// Props:
// 1) clickedItem -> Json object outlining if you clicked a notebook or note.
// 2) posx -> X position of clicked item.
// 3) posy -> Y position of clicked item.
function ContextMenu({clickedItem, posx, posy, handleContextMenuOptionClick}){
    console.log(clickedItem);
    if(clickedItem.notebook_id){
        console.log("Right-clicked notebook menu:", clickedItem.notebook_id);
    }
    else if (clickedItem.note_id){
        console.log("Right-clicked note menu:", clickedItem.note_id);
    }
    return(
        <div id={styles["context-menu-container"]}
            style={{
                position: 'absolute',
                top: posy,
                left: posx,
            }}
        >

        <ul id={styles["context-menu"]}>
            <li id={styles["menu-rename"]} onClick={() => handleContextMenuOptionClick("menu-rename", clickedItem)}>Rename</li>
            <li id={styles["menu-add-sprite"]} onClick={() => handleContextMenuOptionClick("menu-add-sprite", clickedItem)}>Edit Sprite</li>
            {clickedItem.note_id &&(
                <li id={styles["menu-edit-tag"]} onClick={() => handleContextMenuOptionClick("menu-edit-tag", clickedItem)}>Edit Tag</li>
            )}
            <li id={styles["menu-delete"]} onClick={() => handleContextMenuOptionClick("menu-delete", clickedItem)}>Delete</li>
        </ul>

        </div>
    )
}

export default ContextMenu
