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
import { UserContext } from '../hooks/UserContext';

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
  width: 49px;
  color: ${theme.color.main.negative};
  font-size: 12px;
  padding: 10px;
  margin-left: 25px;
  margin-top: 58px;
  cursor: pointer;
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px 0px;
  font-family: ${theme.font.family.pretendard_semiBold};
`;

const MyPage = () => {
  const { userData, error } = useContext(UserContext);
  const navi = useNavigate();
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

  const onClickLeave = async () => {
    if (window.confirm('탈퇴하시겠습니까?')) {
      try {
        await axios.delete('http://13.125.78.31:8080/users', {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        });
        alert('탈퇴가 완료되었습니다.');
        navi('/'); // 탈퇴 후 메인 페이지로 이동
      } catch (err) {
        alert('탈퇴 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <StyledDetails>
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
      <NegativeButton onClick={onClickLeave}>탈퇴하기</NegativeButton>
    </StyledDetails>
  );
};

export default MyPage;
