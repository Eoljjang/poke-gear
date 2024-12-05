// src/components/Sidebar.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/components/Sidebar.css'; // We'll create this CSS file

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar content goes here */}
        <h2>Sidebar Content</h2>
        {/* Add your sidebar items here */}
      </div>
    </>
  );
};
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Sidebar;
