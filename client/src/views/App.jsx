import Header from '../components/Header.jsx'
import DropdownBurgerIcon from '../elements/DropdownBurgerIcon.jsx'
import RecentNotes from '../components/RecentNotes.jsx'
import QuickLinks from '../components/QuickLinks.jsx'
import QuickNote from '../components/QuickNote.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Footer from '../components/Footer.jsx'
import '../styles/views/App.css'
import { useState } from 'react'

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = () => {
      console.log('Opening Sidebar')
      setSidebarOpen(true)
  }
  const closeSidebar = () => {
    console.log('Closing Sidebar');
    setSidebarOpen(false);
  };

  const footerLinks = {
    "Link 1": "URL",
    "Link 2": "URL",
    "Link 3": "URL"
  }

  //TODO
  const handleLogin = () => {
  }

  return (
    <>
      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />


      <Header handleLogin={handleLogin}>
        <DropdownBurgerIcon onClickOpenSidebar={openSidebar} />
      </Header>

      <div className={`dashboard-content ${isSidebarOpen ? 'blurred' : ''}`}>
        <div className="col-1-container">
          <QuickLinks />
        </div>

        <div className="col-2-container">
          <QuickNote />
          <RecentNotes />
        </div>
      </div>

      <Footer footerLinks={footerLinks}/>
    </>
  )
}

export default App
