import Header from '../components/Header.jsx'
import DropdownBurgerIcon from '../elements/DropdownBurgerIcon.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Footer from '../components/Footer.jsx'
import User from '../models/User.js'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import {Outlet} from "react-router-dom"
import '../styles/views/Dashboard.css'
import '../styles/views/App.css'
import axios from "axios"
const dbUrl = import.meta.env.VITE_DB_URL; // Takes the db_url depending on if you're on dev or production.


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [syncing, setSyncing] = useState(false);

  // Query Parameters (Reads the URL)
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get('userEmail');

  // FETCHES USER DATA
  useEffect(() => {
    const postData = {
      userEmail: userEmail
    }
    axios.post(dbUrl + "/getUserData", postData)
    .then(userData => setUserData(userData.data))
  }, [userEmail]) // re-fetches if the email changes (new user logs in).

  // LIVE SYNCING USER DATA WITH DB
  const syncUserData = async (newUserData) => {
    setSyncing(true); // Show syncing icon.
    console.log("sync status:", syncing); // Note: This might log `false` immediately because of the async behavior of setState

    const postData = {
      userEmail: userEmail,
      userData: newUserData
    };

    try {
      await axios.post(dbUrl + "/syncUserData", postData);
      setTimeout(() => {
        setSyncing(false); // Hide syncing after the delay
      }, 1000); // Length of syncing icon display.
    } catch (e) {
      console.error("Error saving user data:", e);
      setSyncing(false); // Ensure syncing is turned off even if an error occurs.
    }
  };

  // ON USER DATA CHANGE, SYNC.
  useEffect(() => {
    if (userData.length > 0){
      syncUserData(userData); // Sync the enire user data object.
    }
  }, [userData]) // Re-syncs whenever user's notebook / notes data changes.

  const openSidebar = () => {
      setSidebarOpen(true)
  }
  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const footerLinks = {
    "Link 1": "URL",
    "Link 2": "URL",
    "Link 3": "URL"
  }

  const dummyUser = new User({
    id: 1,
    name: "John Doe",
    email: "johndoe@email.com",
  });

  //TODO
  const handleLogin = () => {
  }

  return (
    <div id="app">
      <Header>
        <DropdownBurgerIcon onClickOpenSidebar={openSidebar} />
      </Header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} >
        <Link to={`/app/?userEmail=${userEmail}`} className='link'>Dashboard</Link>
        <Link to={`/app/notes?userEmail=${userEmail}`} className="link">Notes</Link>
      </Sidebar>

      {/*
      - We simply render the child of whatever url you're on.
      - If you need to pass state, pass it through the "context" parameter.
      */}
      <div id="app-content">
        <Outlet context={[userData, setUserData, syncing]}/>
      </div>


      <Footer footerLinks={footerLinks}/>
    </div>

  )
}

export default App
