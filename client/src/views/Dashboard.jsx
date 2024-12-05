import Header from '../components/Header.jsx'
import DropdownBurgerIcon from '../elements/DropdownBurgerIcon.jsx'
import RecentNotes from '../components/RecentNotes.jsx'
import QuickLinks from '../components/QuickLinks.jsx'
import QuickNote from '../components/QuickNote.jsx'
import Sidebar from '../components/Sidebar.jsx'
// import Note from './Note.jsx'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import '../styles/views/Dashboard.css'


function Dashboard() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  const openSidebar = () => {
      console.log('Opening Sidebar')
      setSidebarOpen(true)
  }
  const closeSidebar = () => {
    console.log('Closing Sidebar');
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Header>
        <DropdownBurgerIcon onClickOpenSidebar={openSidebar} />
      </Header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} >
        <Link to="/" className='link'>Dashboard</Link>
        <Link to="/notes" className='link'>Notes</Link>
      </Sidebar>

      <div className={`dashboard-content ${isSidebarOpen ? 'blurred' : ''}`}>
        <div className="col-1-container">
          <QuickLinks />
        </div>

        <div className="col-2-container">
          <QuickNote />
          <RecentNotes />
        </div>
      </div>

      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        {/* <Route path="/notes" element={<Note />} /> */}
      </Routes>
    </Router>
  )
}

export default Dashboard
