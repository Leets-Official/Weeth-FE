import styled from 'styled-components';
import UserHeader from '../components/Header/MemberHeader';
import mockUser from '../components/mockData/mockUser';

const StyledDetails = styled.div`
  width: 370px;
`;

const Line = styled.div`
  border: 1px solid;
  width: 325px;
  transform: scaleY(0.2);
  margin: auto;
`;

const InfoWrapper = styled.div``;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 25px;
`;

const Green = styled.div`
  color: #00dda8;
`;

const UserDetail = () => {
  return (
    <StyledDetails>
      <UserHeader />
      <InfoWrapper>
        <Info>
          <div>이름</div>
          <Green>{mockUser[0].name}</Green>
        </Info>
        <Line />
        <Info>
          <div>학번</div>
          <Green>{mockUser[0].studentId}</Green>
        </Info>
        <Line />
        <Info>
          <div>학과</div>
          <Green>{mockUser[0].department}</Green>
        </Info>
        <Line />
        <Info>
          <div>기수</div>
          <Green>{mockUser[0].cardinal}</Green>
        </Info>
        <Line />
        <Info>
          <div>역할</div>
          <Green>{mockUser[0].position}</Green>
        </Info>
        <Line />
        <Info>
          <div>메일</div>
          <Green>{mockUser[0].email}</Green>
        </Info>
        <Line />
      </InfoWrapper>
    </StyledDetails>
  );
};

export default UserDetail;
