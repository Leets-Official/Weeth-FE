import React, { useEffect, useState, FC } from 'react';
import styled, { keyframes } from 'styled-components';
import warningIcon from '@/assets/images/ic_toast_warning.svg';
import theme from '@/styles/theme';

interface ToastProps {
  type: 'success' | 'delete' | 'error';
}

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ToastContainer = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Button = styled.button`
  width: 90%;
  padding: 10px 20px;
  margin: 5px 0;
  border: none;
  border-radius: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const BlueButton = styled(Button)`
  background: ${theme.color.positive};
`;

const RedButton = styled(Button)`
  background: ${theme.color.negative};
`;

const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  padding: 10px;
  background-color: ${theme.color.gray[30]};
  font-size: 16px;
  border-radius: 20px;
`;

const Icon = styled.img`
  margin-right: 5px;
`;

const ToastMessage: FC<ToastProps> = ({ type }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000); // 4초 후 토스트 메시지를 숨김
    return () => clearTimeout(timer);
  }, [type]);

  return isVisible ? (
    <ToastContainer>
      {type === 'success' && <BlueButton>저장되었습니다</BlueButton>}
      {type === 'delete' && <RedButton>삭제되었습니다</RedButton>}
      {type === 'error' && (
        <AlertContainer>
          <Icon src={warningIcon} alt="Warning" />
          저장에 실패했습니다. 인터넷을 확인해주세요.
        </AlertContainer>
      )}
    </ToastContainer>
  ) : null;
};

export default ToastMessage;
