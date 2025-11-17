// src/context/UserContext.jsx
import { createContext, useContext, useState } from "react";

// 1. Create the context
const GlobalContext = createContext(null);

// 2. Create a provider component
export function GlobalProvider({ children }) {
  const [user, setUser] = useState({}); 

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
}

// 3. Custom hook for convenience
export function useGlobal() {
  return useContext(GlobalContext);
}
