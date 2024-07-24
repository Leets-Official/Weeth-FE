import React, { createContext, useState } from 'react';

// Context 객체 생성
export const UserContext = createContext();

// Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <UserContext.Provider value={{ userData, setUserData, error, setError }}>
      {children}
    </UserContext.Provider>
  );
};
