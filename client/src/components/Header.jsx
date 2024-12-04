import '../styles/components/Header.css'
import DropdownBurgerIcon from '../elements/DropdownBurgerIcon.jsx'
import { useState } from 'react'


const Header = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen)
    }

    const handleLogin = () => {
    }

    return (
        <header className="header-container">
            <DropdownBurgerIcon/>
            <h1 className="header-title">Poke-Gear</h1>
            <button onClick={handleLogin} className="header-button">
                Login
            </button>
        </header>
    )
}

export default Header
