import React, { createContext, useState } from 'react';

export const NoticeContext = createContext();

export const NoticeProvider = ({ children }) => {
  const [noticeData, setNoticeData] = useState([]);
  const [error, setError] = useState(null);

  return (
    <NoticeContext.Provider value={{ noticeData, setNoticeData, error, setError }}>
      {children}
    </NoticeContext.Provider>
  );
};
