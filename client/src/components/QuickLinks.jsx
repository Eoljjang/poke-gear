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
            {/* Here's a perma link */}
            <a href="https://github.com/Eoljjang/poke-gear" className={styles["link-item"]} target="_blank" >Link to source code.</a>
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScFrNA2vyXdRFx8MY1VdoDZtaKC2A6DeRRzlND4tPj17URP0w/viewform?usp=sharing" className={styles["link-item"]} target="_blank" >Link to feedback form.</a>
            

            </div>
        </div>
    )
}

export default QuickLinks;
