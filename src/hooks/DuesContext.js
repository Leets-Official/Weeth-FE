/* eslint-disable react/jsx-no-constructed-context-values */
// src/contexts/ApiContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const DuesContext = createContext();

// eslint-disable-next-line react/prop-types
export const DuesProvider = ({ children }) => {
  const [duesData, setDuesData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [currentAmount, setCurrentAmount] = useState(0);
  const [myCardinal, setCardinal] = useState(0);
  const accessToken = localStorage.getItem('accessToken');
  useEffect(() => {
    try {
      const cardinal = 3;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = axios.get(`${BASE_URL}/account/${cardinal}`, {
        headers,
      });
      const result = response.data;
      if (result.code === 200) {
        if (result.data.cardinal !== myCardinal) {
          setDuesData(result.data.receipts);
          setTotalAmount(result.data.total);
          setCardinal(result.data.cardinal);
          setCurrentAmount(result.data.currentAmount);
        }
      } else {
        console.error('Failed to get data:', result.message);
      }
    } catch (error) {
      console.error('Error getting data:', error);
    }
  }, [accessToken]);

  return (
    <DuesContext.Provider
      value={{ duesData, totalAmount, currentAmount, myCardinal }}
    >
      {children}
    </DuesContext.Provider>
  );
};
