import { useNavigate } from 'react-router-dom'
import '../styles/components/Header.css'
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
        <header className="header-container">
            {children}
            <h1 className="main-header-title" onClick={handleGoHome}>Poke-Gear</h1>
            <button onClick={handleSignout} className="header-button">
                Signout
            </button>
        </header>
    )
}

Header.propTypes = {
    children: PropTypes.node,
}

export default Header
