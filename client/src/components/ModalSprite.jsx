// Modal.js

import React from "react";
import "../styles/components/ModalSprite.css"

const ModalSprite = ({onClose, children, selectedNotebook }) => {
    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    background: "white",
                    height: 150,
                    width: 240,
                    margin: "auto",
                    padding: "2%",
                    border: "2px solid #000",
                    borderRadius: "10px",
                    boxShadow: "2px solid black",
                }}
            >
                <h3>Selected Notebook</h3>
                <p>{selectedNotebook}</p>
                {children}
            </div>
        </div>
    );
};

export default ModalSprite;
