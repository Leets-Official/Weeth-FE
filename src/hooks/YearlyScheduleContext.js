/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

// Context 객체 생성
export const YearlyScheduleContext = createContext();

// Provider 컴포넌트
export const YearlyScheduleProvider = ({ children }) => {
  const [yearScheduleData, setYearScheduleData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <YearlyScheduleContext.Provider
      value={{ yearScheduleData, setYearScheduleData, error, setError }}
    >
      {children}
    </YearlyScheduleContext.Provider>
  );
};
