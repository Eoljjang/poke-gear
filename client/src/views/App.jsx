import Header from '../components/Header.jsx'
import DropdownBurgerIcon from '../elements/DropdownBurgerIcon.jsx'
import Sidebar from '../components/Sidebar.jsx'
import Footer from '../components/Footer.jsx'
import User from '../models/User.js'
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {Outlet} from "react-router-dom"
import '../styles/views/Dashboard.css'
import '../styles/views/App.css'
import axios from "axios"


function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

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

  const getUsers = async(e) => {
    await axios.get("http://localhost:4000/users")
    .then(res => {
      console.log(res.data)
    })
    .catch(err => console.log(err))
  }
  getUsers()

  return (
    <div id="app">
      <Header>
        <DropdownBurgerIcon onClickOpenSidebar={openSidebar} />
      </Header>

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} >
        <Link to="/" className='link'>Dashboard</Link>
        <Link to="/notes" className='link'>Notes</Link>
      </Sidebar>

      {/*
      - We simply render the child of whatever url you're on.
      - If you need to pass state, pass it through the "context" parameter.
      */}
      <div id="app-content">
        <Outlet context={[dummyUser]}/>
      </div>


      <Footer footerLinks={footerLinks}/>
    </div>

  )
}

export default App
