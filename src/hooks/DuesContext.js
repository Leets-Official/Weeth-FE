/* eslint-disable react/jsx-no-constructed-context-values */
// src/contexts/ApiContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DuesContext = createContext();

// eslint-disable-next-line react/prop-types
export const DuesProvider = ({ children }) => {
  const [duesData, setDuesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [myCardinal, setCardinal] = useState(0);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );

  const fetchData = async (cardinal = 3) => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${BASE_URL}/account/${cardinal}`, {
        headers,
      });
      const result = response.data;
      if (result.code === 200) {
        setDuesData(result.data.receipts);
        setTotalAmount(result.data.total);
        setCardinal(result.data.cardinal);
      } else {
        console.error('Failed to get data:', result.message);
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [accessToken]);

  // This effect listens for changes to the accessToken in localStorage
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
    <DuesContext.Provider
      value={{ duesData, totalAmount, myCardinal, fetchData }}
    >
      {children}
    </DuesContext.Provider>
  );
};
