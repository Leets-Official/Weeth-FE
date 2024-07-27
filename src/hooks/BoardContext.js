import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boardData, setBoardData] = useState([]);
  const [error, setError] = useState(null);
  const value = useMemo(
    () => ({ boardData, setBoardData, error, setError }),
    [boardData],
  );

  console.log(boardData);

  return (
    <BoardContext.Provider value={value}>{children}</BoardContext.Provider>
  );
};

BoardProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
