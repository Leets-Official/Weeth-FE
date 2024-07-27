// DataContext.js
import React, { createContext, useState } from 'react';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardData, setBoardData] = useState(null);
  const [allUserData, setAllUserData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <BoardContext.Provider value={{ boardData, setBoardData, allUserData, setAllUserData, error, setError }}>
      {children}
    </BoardContext.Provider>
  );
};
