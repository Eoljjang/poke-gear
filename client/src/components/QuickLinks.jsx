import { useState } from "react";
import styles from "../styles/components/QuickLinks.module.css"
function QuickLinks() {
    const [QuickLinks, setQuickLinks] = useState([]); // List contains the current quick links.

    // Future feature: Add in quick links here
    const links = ["https://limitlesstcg.com/", "https://rk9.gg/", "https://www.pokebeach.com/", "https://www.pokemon.com/us/play-pokemon", "https://www.justinbasil.com/"]
    const getDomainName = (url) => {
        return url.replace(/(^\w+:\/\/)?(www\.)?/i, "").split(".")[0]; 
    };

    return(
        <div className={styles["quickLinks-container"]}>
            <div className={styles["quickLinks-header"]}>My Dashboard</div>

            <div className={styles["divider"]}></div>

            <div className={styles["quickLinks-content"]}>
            {links.map((link, index) => (
                <a 
                    key={index} 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className={styles["link-item"]}
                >
                    {getDomainName(link)} 
                    <div className={styles["link-icon"]}>🔗</div> {/* Replace with an actual icon if needed */}
                </a>
            ))}
            </div>
        </div>
    )
}

export default QuickLinks;
