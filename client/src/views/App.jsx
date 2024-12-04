import Header from '../components/Header.jsx'
import RecentNotes from '../elements/RecentNotes.jsx'
import QuickLinks from '../elements/QuickLinks.jsx'
import QuickNote from '../elements/QuickNote.jsx'
import '../styles/views/App.css' // Styling for homepage.

function App() {

  return (
    <>
      <Header/>
      <div className="dashboard-content">
        <div className="col-1-container">
          <QuickLinks/>
        </div>

        <div className="col-2-container">
          <QuickNote/>
          <RecentNotes/>
        </div>

      </div>

    </>
  )
}

export default App
