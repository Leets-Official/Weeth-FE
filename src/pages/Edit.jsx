/* eslint-disable no-restricted-syntax */
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

import theme from '../styles/theme';
import MyPageHeader from '../components/MyPage/MyPageHeader';
import InfoInput from '../components/MyPage/InfoInput';
// import mockUser from '../components/mockData/mockUser';
import DropdownMenu from '../components/DropdownMenu';

import { UserContext } from '../hooks/UserContext';

/* eslint-disable no-alert */

const StyledEdit = styled.div`
  width: 370px;
  padding-bottom: 183px;
`;

const InfoWrapper = styled.div`
  padding-top: 20px;
  text-align: right;
`;

const NoEdit = styled.div`
  pointer-events: none;
  touch-action: none;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Edit = () => {
  const { userData, error } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState([]);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navi = useNavigate();

  useEffect(() => {
    if (userData) {
      setUserInfo([
        { key: 'name', value: userData.name },
        { key: 'studentId', value: userData.studentId },
        { key: 'department', value: userData.department },
        { key: 'tel', value: userData.tel },
        { key: 'cardinals', value: userData.cardinals },
        { key: 'position', value: userData.position },
        { key: 'email', value: userData.email },
        { key: 'password', value: '' },
      ]);
    }
  }, [userData]);

  const editValue = (key, value) => {
    const newUserInfo = userInfo.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setUserInfo(newUserInfo);
  };

  const onSave = async () => {
    if (userInfo.some((item) => !item.value)) {
      alert('모든 항목을 입력해 주세요.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const item of userInfo) {
      if (item.key === 'email' && !emailRegex.test(item.value)) {
        alert('올바른 이메일 형식이 아닙니다.');
        return;
      }
    }

    if (window.confirm('저장하시겠습니까?')) {
      try {
        const data = userInfo.reduce((acc, item) => {
          acc[item.key] = item.value;
          return acc;
        }, {});

        await axios.patch(`${BASE_URL}/users`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Authorization_refresh: `Bearer ${refreshToken}`,
          },
        });
        alert('저장이 완료되었습니다.');
        console.log(data);
        navi('/mypage');
      } catch (err) {
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <StyledEdit>
      <MyPageHeader isEdit userInfo={userInfo} onSave={onSave} />
      {error || !userData ? (
        <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
      ) : (
        <InfoWrapper>
          <InfoInput
            text="이름"
            origValue={userData.name}
            editValue={(value) => editValue('name', value)}
            width="224px"
            padding="25px"
            placeholder="이름을 입력하세요"
            align="right"
            edit={false}
            inputType="text"
          />
          <InfoInput
            text="학번"
            origValue={userData.studentId}
            editValue={(value) => editValue('studentId', value)}
            width="224px"
            padding="25px"
            placeholder="학번을 입력하세요"
            align="right"
            edit={false}
            inputType="number"
          />
          <DropdownMenu
            text="학과"
            origValue={userData.department}
            editValue={(value) => editValue('department', value)}
          />
          <InfoInput
            text="핸드폰"
            origValue={userData.tel}
            editValue={(value) => editValue('tel', value)}
            width="224px"
            padding="25px"
            placeholder="핸드폰 번호를 입력하세요"
            align="right"
            edit={false}
            inputType="number"
          />
          <NoEdit>
            <InfoInput
              text="기수"
              origValue={userData.cardinals}
              editValue={(value) => editValue('cardinal', value)}
              width="224px"
              padding="25px"
              placeholder=""
              align="right"
              edit
            />
          </NoEdit>
          <NoEdit>
            <InfoInput
              text="역할"
              origValue={userData.position}
              editValue={(value) => editValue('position', value)}
              width="224px"
              padding="25px"
              placeholder=""
              align="right"
              edit
            />
          </NoEdit>
          <InfoInput
            text="메일"
            origValue={userData.email}
            editValue={(value) => editValue('email', value)}
            width="224px"
            padding="25px"
            placeholder="메일을 입력하세요"
            align="right"
            edit={false}
          />
          <InfoInput
            text="비밀번호"
            origValue=""
            editValue={(value) => editValue('password', value)}
            width="191px"
            padding="25px"
            placeholder=""
            align="right"
            edit={false}
            inputType="password"
          />
        </InfoWrapper>
      )}
    </StyledEdit>
  );
};

export default Edit;
