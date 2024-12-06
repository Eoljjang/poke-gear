import QuickLinks from "../components/QuickLinks";
import QuickNote from "../components/QuickNote";
import RecentNotes from "../components/RecentNotes";
import Notebook from "../models/Notebook";
import { useOutletContext } from "react-router-dom";

const dummyNotebook = new Notebook({
  id: 1,
  name: "Notebook 1",
});

function Dashboard() {
  const [dummyUser] = useOutletContext();

  const createNotebook = () => {
    dummyUser.createNotebook(dummyNotebook);
  }
    return(
      <div className="dashboard-content">
        <div className="col-1-container">
          <QuickLinks />
        </div>

        <div className="col-2-container">
          <button onClick={createNotebook}>
            Create Notebook
          </button>
          <QuickNote />
          <RecentNotes />
        </div>
      </div>
    )
}

export default Dashboard;
