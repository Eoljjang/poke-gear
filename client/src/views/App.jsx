import Header from '../components/Header.jsx'
import RecentNotes from '../elements/RecentNotes.jsx'
import QuickLinks from '../elements/QuickLinks.jsx'
import '../styles/views/App.css'

function App() {

  return (
    <>
      <Header/>
      <div className="home-content">
        <QuickLinks/>
        <RecentNotes/>
      </div>

    </>
  )
}

export default App
