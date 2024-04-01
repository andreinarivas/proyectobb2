import React, { useContext, createContext, useState, useEffect } from "react";
import { connect } from "../connect/neo4j";

export const UserContext = createContext(null);

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
   

    return (
      <UserContext.Provider
        value={{
          user,
          isLoading,
          setIsLoading,
          setUser,
        }}
      >
        {children}
      </UserContext.Provider>
    );
  }
  
  export function useUserContext() {
    return useContext(UserContext);
  }