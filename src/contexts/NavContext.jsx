import React, { createContext, useState } from "react";

export const NavContext = createContext();

export const NavProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Home");

  return (
    <NavContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavContext.Provider>
  );
};
