import {
  StyledModal,
  ModalContent,
  ModalHeader,
} from '@/styles/attend/CommonModal.styled';
import * as S from '@/styles/attend/ModalAttend.styled';

import { ChangeEvent, useEffect, useState } from 'react';

import check from '@/assets/images/ic_check.svg';
import icClose from '@/assets/images/ic_close.svg';
import correct from '@/assets/images/ic_correct.svg';
import wrong from '@/assets/images/ic_wrong.svg';
import Button from '@/components/Button/Button';
import patchAttend from '@/api/patchAttend';
import Tag from '@/components/Event/Tag';
import { toastInfo } from '@/components/common/ToastMessage';

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
      toastInfo('코드를 입력해 주세요');
      return;
    }
    if (inputValue.length < 4) {
      toastInfo('4자리 숫자를 입력해 주세요.');
      return;
    }
    try {
      const response = await patchAttend({ code: inputValue });
      if (response.data.code === 200) {
        setCodeCheck(1); // Correct
        setMessage('출석 처리가 성공적으로 완료되었습니다.');
        // 출석 처리 성공 후 2초 뒤 모달 닫기
        setTimeout(() => {
          handleAttend(true);
          close();
        }, 2000);
      } else {
        setCodeCheck(2); // Wrong
        setMessage(response.data.message || '출석 처리에 실패했습니다.');
      }
    } catch (error: any) {
      setCodeCheck(2); // Wrong
      const errorMessage =
        error.response?.data?.message || '출석 처리 중 문제가 발생했습니다.';
      setMessage(errorMessage);
      console.error(error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (/^\d{0,4}$/.test(value)) {
      setInputValue(value);
    }
  };
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleCompleteBtn();
    }
  };

  return (
    <StyledModal open={open}>
      <ModalContent>
        <ModalHeader>
          <img src={check} alt="체크" />
          <CloseButton onClick={close} />
        </ModalHeader>
        <div>
          <S.SemiBoldContainer>
            <div>출석하기</div>
            <S.Highlight>{title}</S.Highlight>
          </S.SemiBoldContainer>
          <Tag />
          <S.RegularConatiner>
            <div>
              날짜: {startDateTime} {endDateTime}
            </div>
            <div>장소: {location}</div>
          </S.RegularConatiner>
          <S.Line />
          <S.CenterContainer>
            <S.ModalInput
              type="text"
              placeholder="코드를 입력하세요"
              value={inputValue}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
            />
            <Button onClick={handleCompleteBtn} width="285px" height="45px">
              입력완료
            </Button>
          </S.CenterContainer>
        </div>
        {codeCheck === 0 && <div> </div>}
        {codeCheck === 1 && <RightContainer />}
        {codeCheck === 2 && <WrongContainer message={message} />}
      </ModalContent>
    </StyledModal>
  );
};

export default ModalAttend;
