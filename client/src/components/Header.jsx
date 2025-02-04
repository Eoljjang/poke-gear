import { useNavigate } from 'react-router-dom'
import styles from '../styles/components/Header.module.css'
import PropTypes from 'prop-types'

const Header = ({ children }) => {
    const navigate = useNavigate();

    const handleSignout = (e) => {
        e.preventDefault();
        navigate("/login");
    }

    const handleGoHome = (e) => {
        console.log("Clicked on poke-gear title. Navigating back home.")
        navigate("/app");
    }

    return (
        <header className={styles["header-container"]}>
            {children}
            <h1 className={styles["main-header-title"]} onClick={handleGoHome}>Poke-Gear</h1>
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
