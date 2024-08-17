/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardData, setBoardData] = useState(null);
  const [error, setError] = useState('');

  // console.log('context 내부:', error);

  return (
    <BoardContext.Provider value={{ boardData, setBoardData, error, setError }}>
      {children}
    </BoardContext.Provider>
  );
};
