/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const PenaltyContext = createContext();

export const PenaltyProvider = ({ children }) => {
  const [penaltyData, setPenaltyData] = useState(null);
  const [penaltyFetchError, setPenaltyFetchError] = useState(null);
  const [hasPenalty, setHasPenalty] = useState(true);
  const [myPenaltyCount, setMyPenalty] = useState(0);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );

  const fetchPenalty = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const BASE_URL = process.env.REACT_APP_BASE_URL;

      const response = await axios.get(`${BASE_URL}/penalty`, {
        headers,
      });
      const { data } = response.data;

      if (data.length === 0 || data[0].penaltyCount === 0) {
        setHasPenalty(false);
      } else {
        setPenaltyData(data);
        setMyPenalty(data[0].penaltyCount);
      }
    } catch (err) {
      setPenaltyFetchError(err.message);
    }
  };

  useEffect(() => {
    fetchPenalty();
  }, [accessToken]);

  useEffect(() => {
    const handleStorageChange = () => {
      setAccessToken(localStorage.getItem('accessToken'));
    };

    // Listen for storage changes
    window.addEventListener('storage', handleStorageChange);

    return () => {
      // Cleanup the event listener when the component unmounts
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <PenaltyContext.Provider
      value={{ myPenaltyCount, penaltyData, penaltyFetchError, hasPenalty }}
    >
      {children}
    </PenaltyContext.Provider>
  );
};

PenaltyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
