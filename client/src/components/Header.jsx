import '../styles/components/Header.css'
import PropTypes from 'prop-types'

const Header = ({ children, handleLogin }) => {
    return (
        <header className="header-container">
            {children}
            <h1 className="header-title">Poke-Gear</h1>
            <button onClick={handleLogin} className="header-button">
                Login
            </button>
        </header>
    )
}
Header.propTypes = {
    children: PropTypes.node,
    handleLogin: PropTypes.func.isRequired
}

export default Header
