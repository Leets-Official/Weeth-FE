import '@/components/Attendance/Modal/ModalStyled.css';
import * as S from '@/styles/attend/ModalAttend.styled';

import { ChangeEvent, useEffect, useState } from 'react';

import check from '@/assets/images/ic_check.svg';
import icClose from '@/assets/images/ic_close.svg';
import correct from '@/assets/images/ic_correct.svg';
import wrong from '@/assets/images/ic_wrong.svg';
import Button from '@/components/Button/Button';
import theme from '@/styles/theme';
import patchAttend from '@/api/patchAttend';

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

const ModalAttend: React.FC<{
  title: string;
  location: string;
  startDateTime: string;
  endDateTime: string;
  open: boolean;
  close: () => void;
  handleAttend: (attended: boolean) => void;
}> = ({
  title,
  location,
  startDateTime,
  endDateTime,
  open,
  close,
  handleAttend,
}) => {
  const [codeCheck, setCodeCheck] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!open) {
      setCodeCheck(0);
      setInputValue('');
    }
  }, [open]);

  const handleCompleteBtn = async () => {
    if (!inputValue) {
      // TODO: 토스크 메세지
      alert('코드를 입력해 주세요');
      return;
    }
    if (inputValue.length < 4) {
      alert('4자리 숫자를 입력해 주세요.');
      return;
    }
    try {
      const response = await patchAttend({ code: inputValue });
      setMessage(response.data.message);
      if (response.data.code === 200) {
        setCodeCheck(1); // Correct
        handleAttend(true);
      } else {
        setCodeCheck(2); // Wrong
      }
    } catch (error) {
      setCodeCheck(2); // Wrong
      setMessage('ERROR');
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,4}$/.test(value)) {
      setInputValue(value);
    }
  };

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
            <Button onClick={handleCompleteBtn} width="280px" height="45px">
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
