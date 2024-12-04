import { useState } from "react";
import "../styles/elements/QuickLinks.css"
function QuickLinks() {
    const [QuickLinks, setQuickLinks] = useState([]); // List contains the current quick links.

    // Future feature: Add in quick links here

    return(
        <div className="quickLinks-container">
            I am quick links.
        </div>
    )
}

export default QuickLinks;
