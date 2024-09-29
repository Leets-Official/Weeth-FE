/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AttendCheckContext = createContext();

export const AttendCheckProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [attendFetchError, setAttendFetchError] = useState(null);

  return (
    <AttendCheckContext.Provider
      value={{
        attendanceData,
        setAttendanceData,
        attendFetchError,
        setAttendFetchError,
      }}
    >
      {children}
    </AttendCheckContext.Provider>
  );
};

AttendCheckProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
