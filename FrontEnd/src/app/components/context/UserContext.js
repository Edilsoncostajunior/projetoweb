// src/app/components/context/UserContext.js

"use client";

import { createContext } from "react";
import useAuth from "../hooks/UseAuth";

const Context = createContext();

function UserProvider({ children }) {
  const { authenticated, registerNurse, loginNurse, logout, fetchPatientData } = useAuth();

  return (
    <Context.Provider value={{ authenticated, registerNurse, loginNurse, logout, fetchPatientData }}>
      {children}
    </Context.Provider>
  );
}

export { Context, UserProvider };
