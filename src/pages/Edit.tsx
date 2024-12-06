/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-alert */

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import UserAPI from '@/api/UserAPI';
import { UserContext } from '@/api/UserContext';
import DropdownMenu from '@/components/Button/DropdownMenu';
import Header from '@/components/Header/Header';
import InfoInput from '@/components/MyPage/InfoInput';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';

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
  font-family: ${theme.font.semiBold};
`;

const Edit = () => {
  useCustomBack('/mypage');

  // TODO: useGetUserInfo에서 데이터 받아오도록 수정
  // 현재 페이지에서 사용중인 userInfo와 변수명이 겹쳐서 일단 두겠습니당,,
  const { userData, error } = useContext(UserContext);
  const [userInfo, setUserInfo] = useState<{ key: string; value: any }[]>([]);
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = import.meta.env.VITE_API_URL;
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

  const editValue = (key: string, value: string | number | number[]) => {
    const newUserInfo = userInfo.map((item) =>
      item.key === key ? { ...item, value } : item,
    );
    setUserInfo(newUserInfo);
  };

  const onSave = async () => {
    let response;
    try {
      const data = userInfo.reduce((acc: any, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {});

      const passwordItem = userInfo.find((item) => item.key === 'password');
      const password = passwordItem ? passwordItem.value : '';

      if (password.length < 6 || password.length > 12) {
        alert('비밀번호를 6~12자리로 입력해 주세요.');
        return;
      }

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

      response = await axios.patch(`${BASE_URL}/api/v1/users`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Authorization_refresh: `Bearer ${refreshToken}`,
        },
      });
    } catch (err) {
      alert('저장 중 오류가 발생했습니다.');
      console.error(err);
    }

    if (response?.data?.code === 400) {
      alert(response?.data?.message);
    } else if (window.confirm('저장하시겠습니까?')) {
      if (response?.data?.code === 200) {
        alert('저장이 완료되었습니다.');
        navi('/mypage');
      } else {
        alert('저장 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <StyledEdit>
      <UserAPI />
      <Header title="MY" onClickRightButton={onSave} RightButtonType="TEXT" />
      {!error && userData ? (
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
            buttonstyle="member"
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
            inputType="no-korean"
          />
          <InfoInput
            text="비밀번호"
            origValue=""
            editValue={(value) => editValue('password', value)}
            width="191px"
            padding="25px"
            placeholder="6~12자리/영문, 숫자 조합"
            align="right"
            edit={false}
            inputType="eng-num"
          />
        </InfoWrapper>
      ) : (
        <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
      )}
    </StyledEdit>
  );
};

export default Edit;
