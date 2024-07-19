import styled from 'styled-components';
import MemberHeader from '../components/Member/MemberHeader';
import Category from '../components/Member/Category';
import MemberName from '../components/Member/MemberName';
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
  margin: 0px 10px;
`;

const Member = () => {
  return (
    <StyledMember>
      <MemberHeader />
      <Category />
      <MemberList>
        {mockUser.map((user) => (
          <MemberName
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
