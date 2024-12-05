// src/components/Sidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import "../styles/components/Sidebar.css"; // We'll create this CSS file

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? "open" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-content">
          <text className="sidebar-text">Sidebar Content</text>
        </div>
      </div>
    </>
  );
};
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
