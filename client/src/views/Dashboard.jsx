import QuickLinks from "../components/QuickLinks";
import QuickNote from "../components/QuickNote";
import RecentNotes from "../components/RecentNotes";
import Deck from "../models/Deck";
import { useOutletContext } from "react-router-dom";

const dummyDeck = new Deck({
  id: 1,
  name: "Deck 1",
  cards: [],
});

function Dashboard() {
  const [dummyUser] = useOutletContext();

  const createDeck = () => {
    dummyUser.createDeck(dummyDeck);
    console.log(dummyUser.decks.get(1));
  }
    return(
      <div className="dashboard-content">
        <div className="col-1-container">
          <QuickLinks />
        </div>

        <div className="col-2-container">
          <button onClick={createDeck}>
            Create Deck
          </button>
          <QuickNote />
          <RecentNotes />
        </div>
      </div>
    )
}

export default Dashboard;
