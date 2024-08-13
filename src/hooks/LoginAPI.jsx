// import React, { useEffect, useContext } from 'react';
// import axios from 'axios';
// import { LoginContext } from './LoginContext'; // 경로는 실제 파일 위치에 맞게 조정
// import { tokenValidate } from '../Utils';

// const LoginAPI = ({ email, password }) => {
// const { setToken, setRefreshToken, setError } = useContext(LoginContext);

// const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

/* useEffect(() => {

    const params = {
      email: email,
      password: password,
    };

    console.log(email);
    console.log();

    axios
      .post('http://13.125.78.31:8080/login', params)
      .then((response) => {
        if (response.status === 200 && response.data.data === null ) {
          const tokens = tokenValidate(response);
          setToken(tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          setError(null);
        } else if (response.status === 200 && response.data.code === 200 ) {
          setToken(response.data.accessToken);
          setRefreshToken(response.data.refreshToken);
          setError(null);
        }
        else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('An error occurred while fetching the data');
      });
  }, [ACCESS_TOKEN, setToken, setRefreshToken, setError, email, password]); */

//   return null;
// };

// export default LoginAPI;
