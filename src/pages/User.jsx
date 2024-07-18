import styled from 'styled-components';
import MemberHeader from '../components/Header/UserHeader';
import Generation from '../components/Header/Generation';
import MemberName from '../components/UserName';

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
      <MemberHeader />
      <Generation />
      <MemberList>
        <MemberName />
        <MemberName />
        <MemberName />
        <MemberName />
      </MemberList>
    </StyledMember>
  );
};

export default Member;
