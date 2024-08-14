/* eslint-disable react/jsx-no-constructed-context-values */
// src/contexts/ApiContext.js
import React, { createContext, useState } from 'react';

export const DuesContext = createContext();

// eslint-disable-next-line react/prop-types
export const DuesProvider = ({ children }) => {
  const [duesData, setDuesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [time, setTime] = useState('');
  const [myCardinal, setCardinal] = useState(0);

  return (
    <DuesContext.Provider
      value={{
        duesData,
        setDuesData,
        totalAmount,
        setTotalAmount,
        currentAmount,
        setCurrentAmount,
        myCardinal,
        setCardinal,
        time,
        setTime,
      }}
    >
      {children}
    </DuesContext.Provider>
  );
};
