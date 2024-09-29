import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import MiddleButton from '../../Button/MiddleButton';
import theme from '../../../styles/theme';
import icClose from '../../../assets/images/ic_close.svg';
import check from '../../../assets/images/ic_check.svg';
import './ModalAttend.css';
import wrong from '../../../assets/images/ic_wrong.svg';
import correct from '../../../assets/images/ic_correct.svg';
import { AttendContext } from '../../../hooks/AttendContext';

const StyledModal = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: fixed;
  z-index: 1;
  left: 0;
  top: -15%;
  width: 100%;
  height: 115%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(2px);
  webkitbackdropfilter: 'blur(5px)';
`;

const Line = styled.div`
  border: 1px solid #4d4d4d;
  margin: 30px 10px 0px 10px;
  transform: scaleY(0.2);
`;

const Regular = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
`;

const SemiBold = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  include-font-padding: false;
  display: flex;
  flex-direction: row;
`;

const ImgButton = styled.div`
  display: flex;
  justify-content: flex-end;
  cursor: pointer;
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 25px;
`;

const TextContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 13px;
  font-size: 16px;
`;

const RightContainer = () => {
  return (
    <>
      <ImgContainer>
        <img src={correct} alt="정확한 입력 이미지" />
      </ImgContainer>
      <TextContainer>저장 되었습니다.</TextContainer>
    </>
  );
};

const WrongContainer = ({ message }) => {
  return (
    <>
      <ImgContainer>
        <img src={wrong} alt="잘못된 입력 이미지" />
      </ImgContainer>
      <TextContainer>{message}</TextContainer>
    </>
  );
};
WrongContainer.propTypes = {
  message: PropTypes.string.isRequired,
};

const CloseButton = ({ onClick }) => (
  <ImgButton onClick={onClick}>
    <img src={icClose} alt="닫기" />
  </ImgButton>
);

CloseButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

const ModalAttend = ({ open, close }) => {
  const [codeCheck, setCodeCheck] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const refreshToken = localStorage.getItem('refreshToken');

  // 모달창 나갔다 들어왔을 때 입력 창 비워지고, 하단부 화면 비워지도록
  useEffect(() => {
    if (!open) {
      setCodeCheck(0);
      setInputValue('');
    }
  }, [open]);

  const handleCompleteBtn = async () => {
    if (!inputValue) {
      alert('코드를 입력해 주세요');
      return;
    }
    if (inputValue.length < 4) {
      alert('4자리 숫자를 입력해 주세요.');
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        Authorization_refresh: `Bearer ${refreshToken}`,
      };
      const BASE_URL = import.meta.env.VITE_API_URL;
      const response = await axios.patch(
        `${BASE_URL}/api/v1/attendances`,
        { code: inputValue },
        { headers },
      );
      setMessage(response.data.message);
      if (response.data.code === 200) {
        setCodeCheck(1); // Correct
      } else {
        setCodeCheck(2); // Wrong
      }
    } catch (error) {
      setCodeCheck(2); // Wrong
      setMessage('ERROR');
    }
  };

  const handleChange = (e) => {
    // 4자리 숫자만 입력 가능
    const { value } = e.target;
    if (/^\d{0,4}$/.test(value)) {
      setInputValue(value);
    }
  };

  const { attendanceData, attendFetchError } = useContext(AttendContext);

  let title;
  let location;
  let startDateTime; // 날짜
  let endDateTime; // 시간

  if (attendFetchError) {
    title = 'error';
    location = 'error';
    startDateTime = 'error';
    endDateTime = 'error';
  } else if (!attendanceData) {
    // 데이터를 아직 가져오지 않았거나, 일정이 없는 경우
    title = '로딩중';
    location = '로딩중';
    startDateTime = '로딩중';
    endDateTime = '로딩중';
  } else {
    title = attendanceData.title;
    location = attendanceData.location;

    // Date 객체로 변환
    const startDate = new Date(attendanceData.start);
    const endDate = new Date(attendanceData.end);

    // 날짜 형식으로 변환
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    startDateTime = startDate.toLocaleDateString('ko-KR', dateOptions);

    // 시간 형식으로 변환 (24시간 형식)
    const timeOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
    const startTime = startDate.toLocaleTimeString('ko-KR', timeOptions);
    const endTime = endDate.toLocaleTimeString('ko-KR', timeOptions);

    // 피그마 형식대로 변환
    endDateTime = `(${startTime} ~ ${endTime})`;
  }

  // Listen for accessToken changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('accessToken');
      if (newToken !== accessToken) {
        setAccessToken(newToken);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [accessToken]);

  return (
    <StyledModal open={open}>
      <Regular>
        <div className="modal-content">
          <div className="modal-header">
            <img src={check} alt="체크" className="modal-check-icon" />
            <CloseButton onClick={close} />
          </div>
          <div className="modal-body">
            <SemiBold className="modal-title">출석하기</SemiBold>
            <SemiBold className="modal-text">
              오늘은&nbsp;
              <div style={{ color: theme.color.main.mainColor }}>{title}</div>
              &nbsp;이&#40;가&#41; 있는 날이에요
            </SemiBold>
            <div className="modal-date">
              날짜: {startDateTime} {endDateTime}
            </div>
            <div className="modal-place">장소: {location}</div>
            <Line />
            <input
              className="modal-input"
              type="text"
              placeholder="코드를 입력하세요"
              value={inputValue}
              onChange={handleChange}
            />
          </div>
          <div className="modal-buttons">
            <MiddleButton
              onClick={handleCompleteBtn}
              disabled={!inputValue || codeCheck === 1}
            >
              입력완료
            </MiddleButton>
          </div>
          {codeCheck === 0 && <div> </div>}
          {codeCheck === 1 && <RightContainer message={message} />}
          {codeCheck === 2 && <WrongContainer message={message} />}
        </div>
      </Regular>
    </StyledModal>
  );
};

ModalAttend.propTypes = {
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default ModalAttend;
