import { useState } from "react";
import "../styles/components/QuickLinks.css"
function QuickLinks() {
    const [QuickLinks, setQuickLinks] = useState([]); // List contains the current quick links.

    // Future feature: Add in quick links here

    return(
        <div className="quickLinks-container">
            <div className="quickLinks-header">My Dashboard</div>

            <div className="divider"></div>

            <div className="quickLinks-content">
                <div className="link-item">Link 1 <div className="link-icon">Icon</div></div>
                <div className="link-item">Link 2 <div className="link-icon">Icon</div></div>
                <div className="link-item">Link 3 <div className="link-icon">Icon</div></div>
            </div>
        </div>
    )
}

export default QuickLinks;
