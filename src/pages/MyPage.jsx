import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import MyPageHeader from '../components/MyPage/MyPageHeader';
import mockUser from '../components/mockData/mockUser';

import icName from '../assets/images/ic_name.svg';
import icId from '../assets/images/ic_studentID.svg';
import icDepartment from '../assets/images/ic_department.svg';
import icCardinal from '../assets/images/ic_cardinal.svg';
import icPhone from '../assets/images/ic_phone.svg';
import icPosition from '../assets/images/ic_position.svg';
import icEmail from '../assets/images/ic_mail.svg';

import icEdit from '../assets/images/ic_edit.svg';

import theme from '../styles/theme';

/* eslint-disable no-alert */

const StyledDetails = styled.div`
  width: 370px;
  // 해당페이지는 컴포넌트화될 예정이므로 따로 추가하지 않음
  // 추후에 만들어질 컴포넌트에서 설정하겟습니당
  padding-bottom: 183px;
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

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 15px 25px 0px 0px;
  cursor: pointer;
`;

const NegativeButton = styled.div`
  background-color: transparent;
  border: none;
  color: ${theme.color.main.negative};
  font-size: 12px;
  margin-left: 25px;
  margin-top: 68px;
  cursor: pointer;
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
          <img src={icPhone} alt="phoe" />
          <Text>
            <div>핸드폰</div>
            <MainColor>{mockUser[0].tel}</MainColor>
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
