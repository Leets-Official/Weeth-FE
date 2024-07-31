import styled from 'styled-components';

import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import MyPageHeader from '../components/MyPage/MyPageHeader';
import InfoComponent from '../components/Member/InfoComponent';
// import mockUser from '../components/mockData//mockUser';

import icName from '../assets/images/ic_name.svg';
import icId from '../assets/images/ic_studentID.svg';
import icDepartment from '../assets/images/ic_department.svg';
import icCardinal from '../assets/images/ic_cardinal.svg';
import icPhone from '../assets/images/ic_phone.svg';
import icPosition from '../assets/images/ic_position.svg';
import icEmail from '../assets/images/ic_mail.svg';
import icEdit from '../assets/images/ic_edit.svg';
import icLogout from '../assets/images/ic_logout_white.svg';
import { UserContext } from '../hooks/UserContext';
import UserAPI from '../hooks/UserAPI';

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

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const Account = styled.div`
  display: flex;
  flex-direction: row;
  padding: 94px 25px 0px 25px;
`;

const LeaveButton = styled.button`
  width: 96px;
  height: 45px;
  border: none;
  border-radius: 10px;
  color: ${theme.color.grayScale.gray65};
  background-color: ${theme.color.grayScale.gray18};
  margin-right: 5px;
`;

const LogoutButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 219px;
  height: 45px;
  margin-left: 5px;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: ${theme.color.grayScale.gray30};
`;

const MyPage = () => {
  const { userData, error } = useContext(UserContext);
  const navi = useNavigate();
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const onClickLeave = async () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      try {
        await axios.delete(`${BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Authorization_refresh: `Bearer ${refreshToken}`,
          },
        });
        alert('탈퇴가 완료되었습니다.');
        navi('/'); // 탈퇴 후 메인 페이지로 이동
      } catch (err) {
        alert('탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  const onClickLogout = () => {};

  return (
    <StyledDetails>
      <UserAPI />
      <MyPageHeader isEdit={false} />
      {error || !userData ? (
        <Error>데이터를 불러오는 중 문제가 발생했습니다.</Error>
      ) : (
        <InfoWrapper>
          <InfoComponent
            src={icName}
            alt="smile"
            index="이름"
            value={userData.name}
          />
          <InfoComponent
            src={icId}
            alt="heart"
            index="학번"
            value={userData.studentId}
          />
          <InfoComponent
            src={icDepartment}
            alt="pencil"
            index="학과"
            value={userData.department}
          />
          <InfoComponent
            src={icPhone}
            alt="phone"
            index="핸드폰"
            value={userData.tel}
          />
          <InfoComponent
            src={icCardinal}
            alt="tag"
            index="기수"
            value={userData.cardinals}
          />
          <InfoComponent
            src={icPosition}
            alt="monitor"
            index="역할"
            value={userData.position}
          />
          <InfoComponent
            src={icEmail}
            alt="mail"
            index="메일"
            value={userData.email}
          />
        </InfoWrapper>
      )}
      <ImgButton
        onClick={() => {
          navi(`/edit`);
        }}
      >
        <img src={icEdit} alt="Edit" />
      </ImgButton>
      <Account>
        <LeaveButton onClick={onClickLeave}>탈퇴하기</LeaveButton>
        <LogoutButton onClick={onClickLogout}>
          <img src={icLogout} alt="로그아웃" />
          <div>로그아웃</div>
        </LogoutButton>
      </Account>
    </StyledDetails>
  );
};

export default MyPage;
