import styled from 'styled-components';
import MemberHeader from '../components/Member/MemberHeader';
import mockUser from '../components/mockData/mockUser';

import icName from '../assets/images/ic_name.svg';
import icId from '../assets/images/ic_studentID.svg';
import icDepartment from '../assets/images/ic_department.svg';
import icCardinal from '../assets/images/ic_cardinal.svg';
import icPosition from '../assets/images/ic_position.svg';
import icEmail from '../assets/images/ic_mail.svg';

import theme from '../styles/theme';

const StyledDetails = styled.div`
  width: 370px;
  // 해당페이지는 컴포넌트화될 예정이므로 따로 추가하지 않음
  // 추후에 만들어질 컴포넌트에서 설정하겟습니당
`;

const Line = styled.div`
  border: 1px solid;
  width: 325px;
  transform: scaleY(0.2);
  margin: auto;
`;

const InfoWrapper = styled.div`
  padding-top: 20px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  margin: 25px;
`;

const Text = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 10px;
`;

const MainColor = styled.div`
  color: ${theme.color.main.mainColor};
`;

const UserDetail = () => {
  return (
    <StyledDetails>
      <MemberHeader />
      <InfoWrapper>
        <Info>
          <img src={icName} alt="name" />
          <Text>
            <div>이름</div>
            <MainColor>{mockUser[0].name}</MainColor>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icId} alt="id" />
          <Text>
            <div>학번</div>
            <MainColor>{mockUser[0].studentId}</MainColor>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icDepartment} alt="department" />
          <Text>
            <div>학과</div>
            <MainColor>{mockUser[0].department}</MainColor>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icCardinal} alt="cardinal" />
          <Text>
            <div>기수</div>
            <MainColor>{mockUser[0].cardinal}</MainColor>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icPosition} alt="positon" />
          <Text>
            <div>역할</div>
            <MainColor>{mockUser[0].position}</MainColor>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icEmail} alt="email" />
          <Text>
            <div>메일</div>
            <MainColor>{mockUser[0].email}</MainColor>
          </Text>
        </Info>
        <Line />
      </InfoWrapper>
    </StyledDetails>
  );
};

export default UserDetail;
