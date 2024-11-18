/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

// Context 객체 생성
export const EventInfoContext = createContext();

// Provider 컴포넌트
export const EventInfoProvider = ({ children }) => {
  const [infoData, setInfoData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <EventInfoContext.Provider value={{ infoData, setInfoData, error, setError }}>
      {children}
    </EventInfoContext.Provider>
  );
};
