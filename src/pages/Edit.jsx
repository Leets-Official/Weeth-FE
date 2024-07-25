import React, { useState } from 'react';
import styled from 'styled-components';

import MyPageHeader from '../components/MyPage/MyPageHeader';
import InfoInput from '../components/MyPage/InfoInput';
import mockUser from '../components/mockData/mockUser';

const StyledEdit = styled.div`
  width: 370px;
  padding-bottom: 183px;
`;

const InfoWrapper = styled.div`
  padding-top: 20px;
`;

const NoEdit = styled.div`
  pointer-events: none;
  touch-action: none;
`;

const Edit = () => {
  const [userInfo, setUserInfo] = useState(mockUser[0]);

  const editValue = (key, value) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const saveEditInfo = () => {
    mockUser[0] = userInfo;
  };

  return (
    <StyledEdit>
      <MyPageHeader isEdit saveEditInfo={saveEditInfo} />
      <InfoWrapper>
        <InfoInput
          text="이름"
          origValue={mockUser[0].name}
          editValue={(value) => editValue('name', value)}
        />
        <InfoInput
          text="학번"
          origValue={mockUser[0].studentId}
          editValue={(value) => editValue('studentId', value)}
        />
        <InfoInput
          text="학과"
          origValue={mockUser[0].department}
          editValue={(value) => editValue('department', value)}
        />
        <InfoInput
          text="핸드폰"
          origValue={mockUser[0].tel}
          editValue={(value) => editValue('tel', value)}
        />
        <NoEdit>
          <InfoInput
            text="기수"
            origValue={mockUser[0].cardinal}
            editValue={(value) => editValue('cardinal', value)}
          />
        </NoEdit>
        <InfoInput
          text="역할"
          origValue={mockUser[0].position}
          editValue={(value) => editValue('position', value)}
        />
        <InfoInput
          text="메일"
          origValue={mockUser[0].email}
          editValue={(value) => editValue('email', value)}
        />
      </InfoWrapper>
    </StyledEdit>
  );
};

export default Edit;
