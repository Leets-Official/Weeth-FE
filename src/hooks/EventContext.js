import React, { createContext, useState } from 'react';

// Context 객체 생성
export const EventContext = createContext();

// Provider 컴포넌트
export const EventProvider = ({ children }) => {
  const [eventData, setEventData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <EventContext.Provider value={{ eventData, setEventData, error, setError }}>
      {children}
    </EventContext.Provider>
  );
};
