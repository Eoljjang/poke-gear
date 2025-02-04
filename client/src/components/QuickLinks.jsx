import { useState } from "react";
import styles from "../styles/components/QuickLinks.module.css"
function QuickLinks() {
    const [QuickLinks, setQuickLinks] = useState([]); // List contains the current quick links.

    // Future feature: Add in quick links here

    return(
        <div className={styles["quickLinks-container"]}>
            <div className={styles["quickLinks-header"]}>My Dashboard</div>

            <div className={styles["divider"]}></div>

            <div className={styles["quickLinks-content"]}>
                <div className={styles["link-item"]}>Link 1 <div className={styles["link-icon"]}>Icon</div></div>
                <div className={styles["link-item"]}>Link 2 <div className={styles["link-icon"]}>Icon</div></div>
                <div className={styles["link-item"]}>Link 3 <div className={styles["link-icon"]}>Icon</div></div>
            </div>
        </div>
    )
}

export default QuickLinks;
