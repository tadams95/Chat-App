import { createContext, useState } from "react";

export const GlobalContext = createContext(null);

function GlobalState({ children }) {
  const [showLoginView, setShowLoginView] = useState(false);
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [allUsers, setAllUsers] = useState([]);

  return (
    <GlobalContext.Provider
      value={{
        showLoginView,
        setShowLoginView,
        currentUserName,
        setCurrentUserName,
        currentUser,
        setCurrentUser,
        allUsers,
        setAllUsers,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
