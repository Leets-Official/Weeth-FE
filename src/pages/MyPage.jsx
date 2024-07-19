import styled from 'styled-components';
import MyPageHeader from '../components/Header/MyPageHeader';
import mockUser from '../components/mockData/mockUser';

import icName from '../assets/images/Property 1=이름.png';
import icId from '../assets/images/Property 1=학번.png';
import icDepartment from '../assets/images/Property 1=학과.png';
import icCardinal from '../assets/images/Property 1=기수.png';
import icPhone from '../assets/images/Property 1=핸드폰.png';
import icPosition from '../assets/images/Property 1=역할.png';
import icEmail from '../assets/images/Property 1=메일.png';

import icEdit from '../assets/images/_수정.png';

const StyledDetails = styled.div`
  width: 370px;
`;

const Line = styled.div`
  border: 1px solid;
  width: 325px;
  transform: scaleY(0.2);
  margin: auto;
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

const Green = styled.div`
  color: #00dda8;
`;

const Edit = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 25px 0px 0px;
`;

const MyPage = () => {
  return (
    <StyledDetails>
      <MyPageHeader />
      <div>
        <Info>
          <img src={icName} alt="name" />
          <Text>
            <div>이름</div>
            <Green>{mockUser[0].name}</Green>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icId} alt="id" />
          <Text>
            <div>학번</div>
            <Green>{mockUser[0].studentId}</Green>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icDepartment} alt="department" />
          <Text>
            <div>학과</div>
            <Green>{mockUser[0].department}</Green>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icPhone} alt="phoe" />
          <Text>
            <div>핸드폰</div>
            <Green>{mockUser[0].tel}</Green>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icCardinal} alt="cardinal" />
          <Text>
            <div>기수</div>
            <Green>{mockUser[0].cardinal}</Green>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icPosition} alt="positon" />
          <Text>
            <div>역할</div>
            <Green>{mockUser[0].position}</Green>
          </Text>
        </Info>
        <Line />
        <Info>
          <img src={icEmail} alt="email" />
          <Text>
            <div>메일</div>
            <Green>{mockUser[0].email}</Green>
          </Text>
        </Info>
        <Line />
      </div>
      <Edit>
        <img src={icEdit} alt="Edit" />
      </Edit>
    </StyledDetails>
  );
};

export default MyPage;
