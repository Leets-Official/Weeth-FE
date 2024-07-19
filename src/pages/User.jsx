import styled from 'styled-components';
import UserHeader from '../components/Header/UserHeader';
import Generation from '../components/Header/Generation';
import UserName from '../components/UserName';
import mockUser from '../components/mockData/mockUser';

const StyledMember = styled.div`
  width: 370px;
`;

const MemberList = styled.div`
  position: absolute;
  background-color: #2e2e2e;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
`;

const Member = () => {
  return (
    <StyledMember>
      <UserHeader />
      <Generation />
      <MemberList>
        {mockUser.map((user) => (
          <UserName
            name={user.name}
            cardinal={user.cardinal}
            position={user.position}
          />
        ))}
      </MemberList>
    </StyledMember>
  );
};

export default Member;
