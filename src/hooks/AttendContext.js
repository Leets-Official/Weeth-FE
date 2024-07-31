/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const AttendContext = createContext();

export const AttendProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [attendFetchError, setAttendFetchError] = useState(null);
  const [hasSchedule, setHasSchedule] = useState(true);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const ACCESS_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;
        // const accessToken = localStorage.getItem('accessToken');
        const BASE_URL = process.env.REACT_APP_BASE_URL;
        const headers = {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        };

        const response = await axios.get(`${BASE_URL}/attendances`, {
          headers,
        });

        const { data } = response.data;
        // eslint-disable-next-line no-console
        // console.log(data);

        if (data.title === null && data.startDateTime === null) {
          setHasSchedule(false);
        } else {
          setAttendanceData(data);
        }
      } catch (err) {
        setAttendFetchError(err.message);
      }
    };

    fetchAttendances();
  }, []);

  return (
    <AttendContext.Provider
      value={{ attendanceData, attendFetchError, hasSchedule }}
    >
      {children}
    </AttendContext.Provider>
  );
};

AttendProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
