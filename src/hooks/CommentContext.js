/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const CommentContext = createContext();

export const CommentProvider = ({ children }) => {
  const [commentData, setCommentData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <CommentContext.Provider
      value={{ commentData, setCommentData, error, setError }}
    >
      {children}
    </CommentContext.Provider>
  );
};
