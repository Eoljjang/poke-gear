// src/components/Sidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import "../styles/components/Sidebar.css"; // We'll create this CSS file

const Sidebar = ({ children, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      />

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <ul className="sidebar-list">

          {React.Children.map(children, (child, index) => (
            <li onClick={onClose} className="sidebar-list-item">
              <p>
                {child}
              </p>
            </li>

          ))}
          </ul>
        </div>
      </div>
    </>
  );
};
Sidebar.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
