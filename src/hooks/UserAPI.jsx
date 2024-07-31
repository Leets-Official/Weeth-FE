import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './UserContext';

// 일단 빨리 연결 하고 싶어서 eslintigonre에 넣고 에러 다 무시하고 했습니다,,

/* 
api에서 받아오는 data 내용 예시
{
    "id": 2,
    "name": "이유진",
    "studentId": "1",
    "tel": "010-0101-0101",
    "department": "SW",
    "email": "lee@gmail.com",
    "cardinals": [3],
    "position": "FE"
}
다른데서 사용 할 때 

const { userData, error } = useContext(UserContext);
이거 가져오고
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }
이렇게 에러 처리 해준 뒤

userData.name 이런식으로 data 사용하면 됩니당!!
*/

const UserAPI = () => {
  const { setUserData, setError, setAllUserData } = useContext(UserContext);

  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
      Authorization_refresh: `Bearer ${refreshToken}`,
    };

    // 내 정보 조회
    axios
      .get(`${BASE_URL}/users`, { headers })
      .then((response) => {
        if (response.data.code === 200) {
          setUserData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError('An error occurred while fetching the data');
      });

      // 모든 멤버 조회
      axios.get(`${BASE_URL}/users/all`, { headers })
      .then((response) => {
        if (response.data.code === 200) {
          setAllUserData(response.data.data);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError('An error occurred while fetching the all users data');
      });

  }, [accessToken, setUserData, setError, setAllUserData]);

  return null;
};

export default UserAPI;
