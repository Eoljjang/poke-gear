import { useNavigate, useLocation } from "react-router-dom";
import styles from '../styles/components/Header.module.css'
import colours from "../styles/Colours.module.css"
import PropTypes from 'prop-types'

const Header = ({ children }) => {
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const userEmail = queryParams.get("userEmail");

    const handleSignout = (e) => {
        e.preventDefault();
        navigate("/login");
    }

    const handleGoHome = (e) => {
        console.log("Clicked on poke-gear title. Navigating back home.")
        console.log("^ This feature is disbaled for now due to userData refetching errors.")
        //navigate(`/app?userEmail${userEmail}`);
    }

    return (
        <header className={`${styles["header-container"]} ${colours["light-blue"]}`}>
            {children}
            <p className={styles["main-header-title"]} onClick={handleGoHome}>Poke-Gear</p>
            <button onClick={handleSignout} className={styles["header-button"]}>
                Signout
            </button>
        </header>
    )
}

Header.propTypes = {
    children: PropTypes.node,
}

export default Header
