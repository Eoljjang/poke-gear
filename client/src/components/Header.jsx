import { useNavigate } from 'react-router-dom'
import '../styles/components/Header.css'
import PropTypes from 'prop-types'

const Header = ({ children }) => {
    const navigate = useNavigate();

    const handleSignout = (e) => {
        e.preventDefault();
        navigate("/login");
    }

    return (
        <header className="header-container">
            {children}
            <h1 className="header-title">Poke-Gear</h1>
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
