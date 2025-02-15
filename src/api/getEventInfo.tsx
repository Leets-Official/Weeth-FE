import { useState, useEffect } from 'react';
import api from './api';

export const getEventInfo = async (
  type: string | undefined,
  id: string | undefined,
) => {
  return api.get(`/api/v1/${type}/${id}`);
};

export const useGetEventInfo = (type?: string, id?: string) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id && type) {
          const response = await getEventInfo(type, id);
          if (response.data.code === 200) {
            setData(response.data.data);
          } else {
            setError(response.data.message);
          }
        }
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      }
    };

    fetchData();
  }, [id, type]);

  return { data, error };
};

export default useGetEventInfo;
