import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { PenaltyContext } from './PenaltyContext';

const PenaltyAPI = () => {
  const { setMyPenalty, setPenaltyData, setPenaltyFetchError } =
    useContext(PenaltyContext);
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const refreshToken = localStorage.getItem('refreshToken');

  const fetchPenalty = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      };
      const BASE_URL = process.env.REACT_APP_BASE_URL;

      const response = await axios.get(`${BASE_URL}/api/v1/penalties`, {
        headers,
      });
      const { data } = response.data;
      console.log(data);
      setPenaltyData(data.Penalties);
      setMyPenalty(data.penaltyCount);
    } catch (err) {
      setPenaltyFetchError(err.message);
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchPenalty();
    }
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

  return null;
};

export default PenaltyAPI;
