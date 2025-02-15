import api from '@/api/api';

const getFileUrl = async (data: File, fileName: string) => {
  const res = await api.get(`/files/`, {
    params: { fileName },
    data,
  });
  return res.data;
};

export default getFileUrl;
