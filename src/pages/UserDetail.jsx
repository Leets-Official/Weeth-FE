import styled from 'styled-components';
import UserHeader from '../components/Header/UserHeader';

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
          <Green>이강혁</Green>
        </Info>
        <Line />
        <Info>
          <div>학번</div>
          <Green>이강혁</Green>
        </Info>
        <Line />
        <Info>
          <div>학과</div>
          <Green>이강혁</Green>
        </Info>
        <Line />
        <Info>
          <div>기수</div>
          <Green>이강혁</Green>
        </Info>
        <Line />
        <Info>
          <div>역할</div>
          <Green>이강혁</Green>
        </Info>
        <Line />
        <Info>
          <div>메일</div>
          <Green>이강혁</Green>
        </Info>
        <Line />
      </InfoWrapper>
    </StyledDetails>
  );
};

export default UserDetail;
