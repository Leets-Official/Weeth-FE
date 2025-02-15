import '@/components/Attendance/Modal/ModalStyled.css';
import * as S from '@/styles/attend/ModalAttend.styled';
import { ChangeEvent, useEffect, useState } from 'react';
import api from '@/api/api';

import check from '@/assets/images/ic_check.svg';
import icClose from '@/assets/images/ic_close.svg';
import correct from '@/assets/images/ic_correct.svg';
import wrong from '@/assets/images/ic_wrong.svg';
import Button from '@/components/Button/Button';
import theme from '@/styles/theme';
import useGetAttendCheck from '@/api/useGetAttendCheck';

const RightContainer: React.FC = () => {
  return (
    <>
      <S.ImgContainer>
        <img src={correct} alt="정확한 입력 이미지" />
      </S.ImgContainer>
      <S.TextContainer>저장 되었습니다.</S.TextContainer>
    </>
  );
};

const WrongContainer: React.FC<{ message: string }> = ({ message }) => {
  return (
    <>
      <S.ImgContainer>
        <img src={wrong} alt="잘못된 입력 이미지" />
      </S.ImgContainer>
      <S.TextContainer>{message}</S.TextContainer>
    </>
  );
};

const CloseButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <S.ImgButton onClick={onClick}>
    <img src={icClose} alt="닫기" />
  </S.ImgButton>
);

const ModalAttend: React.FC<{ open: boolean; close: () => void }> = ({
  open,
  close,
}) => {
  const [codeCheck, setCodeCheck] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem('accessToken'),
  );

  const { attendCheckInfo, error } = useGetAttendCheck();

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
      const response = await api.patch(`/api/v1/attendances`, {
        code: inputValue,
      });
      setMessage(response.data.message);
      if (response.data.code === 200) {
        setCodeCheck(1); // Correct
      } else {
        setCodeCheck(2); // Wrong
      }
    } catch (Patcherror) {
      setCodeCheck(2); // Wrong
      setMessage('ERROR');
      console.error(Patcherror);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,4}$/.test(value)) {
      setInputValue(value);
    }
  };

  let title: string;
  let location: string;
  let startDateTime: string;
  let endDateTime: string;

  if (error) {
    title = 'error';
    location = 'error';
    startDateTime = 'error';
    endDateTime = 'error';
  } else if (!attendCheckInfo) {
    title = '로딩중';
    location = '로딩중';
    startDateTime = '로딩중';
    endDateTime = '로딩중';
  } else {
    const attendance = attendCheckInfo.attendances[0]; // 첫 번째 출석 정보
    title = attendance.title;
    location = attendance.location;
    const startDate = new Date(attendance.start);
    const endDate = new Date(attendance.end);

    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    startDateTime = startDate.toLocaleDateString('ko-KR', dateOptions);

    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    const startTime = startDate.toLocaleTimeString('ko-KR', timeOptions);
    const endTime = endDate.toLocaleTimeString('ko-KR', timeOptions);

    endDateTime = `(${startTime} ~ ${endTime})`;
  }

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
    <S.StyledModal open={open}>
      <S.Regular>
        <div className="modal-content">
          <div className="modal-header">
            <img src={check} alt="체크" className="modal-check-icon" />
            <CloseButton onClick={close} />
          </div>
          <div className="modal-body">
            <S.SemiBold className="modal-title">출석하기</S.SemiBold>
            <S.SemiBold className="modal-text">
              오늘은&nbsp;
              <div style={{ color: theme.color.main }}>{title}</div>
              &nbsp;이&#40;가&#41; 있는 날이에요
            </S.SemiBold>
            <div className="modal-date">
              날짜: {startDateTime} {endDateTime}
            </div>
            <div className="modal-place">장소: {location}</div>
            <S.Line />
            <input
              className="modal-input"
              type="text"
              placeholder="코드를 입력하세요"
              value={inputValue}
              onChange={handleChange}
            />
          </div>
          <div className="modal-buttons">
            <Button onClick={handleCompleteBtn} width="280" height="45">
              입력완료
            </Button>
          </div>
          {codeCheck === 0 && <div> </div>}
          {codeCheck === 1 && <RightContainer />}
          {codeCheck === 2 && <WrongContainer message={message} />}
        </div>
      </S.Regular>
    </S.StyledModal>
  );
};

export default ModalAttend;
