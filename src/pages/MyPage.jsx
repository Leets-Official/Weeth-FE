import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import MyPageHeader from '../components/MyPage/MyPageHeader';
import InfoComponent from '../components/Member/InfoComponent';
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

const InfoWrapper = styled.div`
  padding-top: 20px;
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
        <InfoComponent
          src={icName}
          alt="smile"
          index="이름"
          value={mockUser[0].name}
        />
        <InfoComponent
          src={icId}
          alt="heart"
          index="학번"
          value={mockUser[0].studentId}
        />
        <InfoComponent
          src={icDepartment}
          alt="pencil"
          index="학과"
          value={mockUser[0].department}
        />
        <InfoComponent
          src={icPhone}
          alt="phone"
          index="핸드폰"
          value={mockUser[0].tel}
        />
        <InfoComponent
          src={icCardinal}
          alt="tag"
          index="기수"
          value={mockUser[0].cardinal}
        />
        <InfoComponent
          src={icPosition}
          alt="monitor"
          index="역할"
          value={mockUser[0].position}
        />
        <InfoComponent
          src={icEmail}
          alt="mail"
          index="메일"
          value={mockUser[0].email}
        />
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
