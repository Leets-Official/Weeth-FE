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

  useEffect(() => {
    const fetchPenalty = async () => {
      try {
        const ACCESS_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;
        const headers = {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        };

        const response = await axios.get('http://13.125.78.31:8080/penalty', {
          headers,
        });
        const { data } = response.data;
        // eslint-disable-next-line no-console
        console.log(data[0]);
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

    fetchPenalty();
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
