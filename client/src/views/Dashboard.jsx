import QuickLinks from "../components/QuickLinks";
import QuickNote from "../components/QuickNote";
import RecentNotes from "../components/RecentNotes";
import { useOutletContext } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useOutletContext();

    return(
      <div className="dashboard-content">
        <div className="col-1-container">
          <QuickLinks />
        </div>

        <div className="col-2-container">
          <RecentNotes />
        </div>
      </div>
    )
}

export default Dashboard;
