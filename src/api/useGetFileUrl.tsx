// import { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;
const accessToken = localStorage.getItem('accessToken');
const refreshToken = localStorage.getItem('refreshToken');

export const getFileUrl = async (fileNames: string[]) => {
  const response = await axios.get(`${BASE_URL}/files/`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    },
    params: {
      fileName: fileNames,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'repeat' });
    },
  });
  return response;
};

export const useGetFileUrl = (fileNames: string[]) => {
  const [fileUrl, setFileUrl] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileUrls = async () => {
      try {
        const response = await getFileUrl(fileNames);
        setFileUrl(response.data.data);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message);
      }
    };

    fetchFileUrls();
  }, [fileNames]);

  return { fileUrl, error };
};

export default getFileUrl;
