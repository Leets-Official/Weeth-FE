import styled from 'styled-components';
import { useState } from 'react';

import theme from '../styles/theme';
import MemberHeader from '../components/Member/MemberHeader';
import Category from '../components/Member/Category';
import MemberName from '../components/Member/MemberName';
import mockUser from '../components/mockData/mockUser';

const StyledMember = styled.div`
  width: 370px;
  font-family: ${theme.font.family.pretendard_regular};
`;

const CategoryWrapper = styled.div`
  margin: 0 30px;
`;

const MemberList = styled.div`
  position: absolute;
  background-color: ${theme.color.grayScale.gray18};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
  max-width: 350px;
  margin: 0px 10px auto;
  padding-bottom: 183px;
`;

const Member = () => {
  const [selectedCardinal, setSelectedCardinal] = useState(null);

  const filteredUsers =
    selectedCardinal === null
      ? mockUser
      : mockUser.filter((user) => user.cardinal === selectedCardinal);

  return (
    <StyledMember>
      <MemberHeader />
      <CategoryWrapper>
        <Category setSelectedCardinal={setSelectedCardinal} />
      </CategoryWrapper>
      <MemberList>
        {filteredUsers.map((user) => (
          <MemberName
            key={user.name}
            name={user.name}
            studentId={user.studentId}
            department={user.department}
            email={user.email}
            cardinal={user.cardinal}
            position={user.position}
          />
        ))}
      </MemberList>
    </StyledMember>
  );
};

export default Member;
