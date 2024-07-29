import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [allUserData, setAllUserData] = useState([]);
  const [error, setError] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData, allUserData, setAllUserData, error, setError }}>
      {children}
    </UserContext.Provider>
  );
};
