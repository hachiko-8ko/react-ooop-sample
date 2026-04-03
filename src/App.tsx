import { useEffect } from "react";
import { useDispatch } from "react-redux";

import ChatCounter from "./components/chat-counter/ChatCounter";
import ChatList from "./components/chat-list/ChatList";
import Notification from "./components/notification/Notification";
import GlobalStateService from "./services/GlobalStateService";
import initializeChats from "./utilities/InitializeChats";

function App() {
  // Add some data when first starting
  const dispatch = useDispatch();
  let initialized = false;
  useEffect(() => {
    // This is supposed to run only once on component start but it runs twice, so use a flag
    if (!initialized) {
      initializeChats(new GlobalStateService(dispatch));
      initialized = true;
    }
  }, []);

  return (
    <>
      <div className="bg-light">
        <div className="container-fluid card">
          <div className="card-body">
            <nav className="navbar navbar-expand navbar-light mb-1">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  Chat Storm
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarNavAltMarkup"
                  aria-controls="navbarNavAltMarkup"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <span
                  className="collapse navbar-collapse"
                  id="navbarNavAltMarkup"
                >
                  <span className="w-100">
                    <Notification></Notification>
                  </span>
                  <span className="ms-auto">
                    <ChatCounter></ChatCounter>
                  </span>
                  <div className="navbar-nav"></div>
                </span>
              </div>
            </nav>
            <div>
              <ChatList></ChatList>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
