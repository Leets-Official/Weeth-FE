/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/prop-types */
// src/contexts/ApiContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DuesContext = createContext();

export const DuesProvider = ({ children }) => {
  const [duesData, setDuesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const fetchData = async (cardinal = 3) => {
    try {
      const ACCESS_TOKEN = process.env.REACT_APP_ADMIN_TOKEN;
      const headers = {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      };
      const response = await axios.get(
        `http://13.125.78.31:8080/account/${cardinal}`,
        { headers },
      );
      const result = response.data;
      if (result.code === 200) {
        setDuesData(result.data.receipts);
        setTotalAmount(result.data.total);
        // eslint-disable-next-line no-console
        console.log('get data:', result.data);
      } else {
        // eslint-disable-next-line no-console
        console.error('Failed to get data:', result.message);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error getting data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DuesContext.Provider value={{ duesData, totalAmount, fetchData }}>
      {children}
    </DuesContext.Provider>
  );
};
