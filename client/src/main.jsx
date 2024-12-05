import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './views/App.jsx' // Top level child of the app.
import NotesPage from './views/NotesPage.jsx' // child
import QuickLinks from './components/QuickLinks.jsx'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'
import Dashboard from './views/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Dashboard is the parent route
    children: [ // These are the various views you can pass into the outlet.
      {
        path: "/",
        element: <Dashboard/>,
      },
      {
        path: "notes",
        element: <NotesPage />  // Note is a child route inside Dashboard
      },

    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
