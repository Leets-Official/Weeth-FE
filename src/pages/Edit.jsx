import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import theme from '../styles/theme';
import MyPageHeader from '../components/MyPage/MyPageHeader';
import InfoInput from '../components/MyPage/InfoInput';
// import mockUser from '../components/mockData/mockUser';

import { UserContext } from '../hooks/UserContext';

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
  const [userInfo, setUserInfo] = useState(UserContext);
  const { userData, error } = useContext(UserContext);

  const editValue = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  // const saveEditInfo = () => {
  //   userData = userInfo;
  // };

  return (
    <StyledEdit>
      <MyPageHeader isEdit />
      {error || !userData ? (
        <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
      ) : (
        <InfoWrapper>
          <InfoInput
            text="이름"
            origValue={userData.name}
            editValue={(value) => editValue('name', value)}
            width="75%"
            padding="25px"
          />
          <InfoInput
            text="학번"
            origValue={userData.studentId}
            editValue={(value) => editValue('studentId', value)}
            width="75%"
            padding="25px"
          />
          <InfoInput
            text="학과"
            origValue={userData.department}
            editValue={(value) => editValue('department', value)}
            width="75%"
            padding="25px"
          />
          <InfoInput
            text="핸드폰"
            origValue={userData.tel}
            editValue={(value) => editValue('tel', value)}
            width="75%"
            padding="25px"
          />
          <NoEdit>
            <InfoInput
              text="기수"
              origValue={userData.cardinals}
              editValue={(value) => editValue('cardinal', value)}
              width="75%"
              padding="25px"
            />
          </NoEdit>
          <InfoInput
            text="역할"
            origValue={userData.position}
            editValue={(value) => editValue('position', value)}
            width="75%"
            padding="25px"
          />
          <InfoInput
            text="메일"
            origValue={userData.email}
            editValue={(value) => editValue('email', value)}
            width="75%"
            padding="25px"
          />
        </InfoWrapper>
      )}
    </StyledEdit>
  );
};

export default Edit;
