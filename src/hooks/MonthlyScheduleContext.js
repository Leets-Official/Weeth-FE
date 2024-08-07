import React, { createContext, useState } from 'react';

// Context 객체 생성
export const MonthlyScheduleContext = createContext();

// Provider 컴포넌트
export const MonthlyScheduleProvider = ({ children }) => {
  const [monthScheduleData, setMonthScheduleData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <MonthlyScheduleContext.Provider value={{ monthScheduleData, setMonthScheduleData, error, setError }}>
      {children}
    </MonthlyScheduleContext.Provider>
  );
};
