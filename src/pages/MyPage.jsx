import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import MyPageHeader from '../components/MyPage/MyPageHeader';
import mockUser from '../components/mockData/mockUser';

import icName from '../assets/images/Property 1=이름.png';
import icId from '../assets/images/Property 1=학번.png';
import icDepartment from '../assets/images/Property 1=학과.png';
import icCardinal from '../assets/images/Property 1=기수.png';
import icPhone from '../assets/images/Property 1=핸드폰.png';
import icPosition from '../assets/images/Property 1=역할.png';
import icEmail from '../assets/images/Property 1=메일.png';

import icEdit from '../assets/images/_수정.png';

/* eslint-disable no-alert */

const StyledDetails = styled.div`
  width: 370px;
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

const Green = styled.div`
  color: #00dda8;
`;

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 25px 0px 0px;
  cursor: pointer;
`;

const NegativeButton = styled.div`
  background-color: transparent;
  border: none;
  color: #ff5858;
  font-size: 12px;
  margin-left: 25px;
  margin-top: 68px;
`;

const MyPage = () => {
  const navi = useNavigate();
  return (
    <StyledDetails>
      <MyPageHeader isEdit={false} />
      <InfoWrapper>
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
      </InfoWrapper>
      <ImgButton
        onClick={() => {
          navi(`/edit`);
        }}
      >
        <img src={icEdit} alt="Edit" />
      </ImgButton>
      <NegativeButton
        onClick={() => {
          window.confirm('탈퇴하시겠습니까?');
        }}
      >
        탈퇴하기
      </NegativeButton>
    </StyledDetails>
  );
};

export default MyPage;
