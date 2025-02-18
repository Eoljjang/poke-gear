// src/components/Sidebar.jsx
import React from "react";
import PropTypes from "prop-types";
import styles from "../styles/components/Sidebar.module.css"; // We'll create this CSS file

const Sidebar = ({ children, isOpen, onClose }) => {
  return (
    <>
      <div
        className={`${styles['sidebar-overlay']} ${isOpen ? styles.open : ""}`}
        onClick={onClose}
      />

      <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
        <div className={styles["sidebar-content"]}>
          <ul className={styles["sidebar-list"]}>

          {React.Children.map(children, (child, index) => (
            <li onClick={onClose} className={styles["sidebar-list-item"]}>
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
