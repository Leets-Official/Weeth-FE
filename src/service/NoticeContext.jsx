/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react';

export const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const [noticeData, setNoticeData] = useState([]);
  const [error, setError] = useState(null);

  return (
    <NoticeContext.Provider
      value={{ noticeData, setNoticeData, error, setError }}
    >
      {children}
    </NoticeContext.Provider>
  );
};
