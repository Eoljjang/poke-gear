import { useState } from "react";
import styles from '../styles/components/QuickNote.module.css'
import ModalQuickNote from "../Modals/ModalQuickNote";
function QuickNote({userData, setUserData}){
    const [modalVisible, setModalVisible] = useState(false);

    // On click of the quick note button, it'll open up a modal.
    const handleOpen = () => {
        setModalVisible(true);
        console.log("quicknote btn has been clicked.");
    }

    const handleClose = () => {
        setModalVisible(false)
        console.log("quicknote modal has been closed.")
    }

    return(
        <div className={styles["quicknote-container"]} >
            <button className={styles["open-quicknote-btn"]} onClick={handleOpen}>
                Quicknote
            </button>
            {modalVisible && (
                <>
                    {/* Overlay blocks interactions with content behind the modal. */}
                    <div className={styles["modal-overlay"]}></div>

                    {/* Conditonally renders the modal. */}
                    <ModalQuickNote
                        userData={userData}
                        setUserData={setUserData}
                        handleClose={handleClose}
                    >
                    </ModalQuickNote>
                </>

            )}
        </div>
    )
}

export default QuickNote;
