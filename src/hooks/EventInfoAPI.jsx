import { useEffect, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { EventInfoContext } from './EventInfoContext';

const EventInfoAPI = ({ id }) => {
  const { setInfoData, setError } = useContext(EventInfoContext);
  console.log('넘겨준 좀 위에', id);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    };
    const fetchData = async () => {
      console.log('넘겨준', id);

      try {
        if (id) {
          const response = await axios.get(`${BASE_URL}/event/${id}`, {
            headers,
          });
          if (response.data.code === 200) {
            setInfoData(response.data);
          } else {
            setError(response.data.message);
          }
        }
      } catch (err) {
        setError('An error occurred while fetching the data');
      }
    };

    fetchData();
  }, [id]);

  return null;
};

EventInfoAPI.propTypes = {
  id: PropTypes.number.isRequired,
};

export default EventInfoAPI;
