/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AttendContext = createContext();

export const AttendProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [attendFetchError, setAttendFetchError] = useState(null);
  const [hasSchedule, setHasSchedule] = useState(false);

  return (
    <AttendContext.Provider
      value={{
        attendanceData,
        setAttendanceData,
        attendFetchError,
        setAttendFetchError,
        hasSchedule,
        setHasSchedule,
      }}
    >
      {children}
    </AttendContext.Provider>
  );
};

AttendProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
