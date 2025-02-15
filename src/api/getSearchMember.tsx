import api from './api';

export const getSearchMember = async (keyword: string) => {
  return api.get(`/api/v1/users/search`, {
    params: { keyword },
  });
};

export default getSearchMember;
