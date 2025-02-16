import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import warningIcon from '@/assets/images/ic_toast_warning.svg';
import theme from '@/styles/theme';

interface CustomToastContentProps {
  message: string;
  icon?: string;
}

const CustomToastContainer = styled(ToastContainer).attrs({})`
  .Toastify__toast {
    border-radius: 50px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 2.5rem;
    max-width: 90%;
    height: 2.5rem;
    min-height: 2.5rem;
    max-height: 2.5rem;
    padding: 0.938rem;
    font-family: ${theme.font.regular};
  }

  .Toastify__toast--success {
    background: ${theme.color.positive};
  }
  .Toastify__toast--info {
    background: ${theme.color.negative};
  }
  .Toastify__toast--error {
    background: ${theme.color.gray[30]};
  }
  .Toastify__close-button {
    display: none;
  }
  .Toastify__toast-body {
    font-size: 12px;
    flex: 1;
    text-align: center;
  }
`;

const IconImg = styled.img`
  width: 20px;
  margin-right: 10px;
`;

const CustomToastContent: React.FC<CustomToastContentProps> = ({
  message,
  icon,
}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {icon && <IconImg src={icon} alt="Icon" />}
    <span>{message}</span>
  </div>
);

interface ShowCustomToastOptions {
  type: 'success' | 'info' | 'error';
  message: string;
}

// 토스트 메시지 함수
const showCustomToast = ({ type, message }: ShowCustomToastOptions) => {
  const icon = type === 'error' ? warningIcon : undefined;
  toast[type](<CustomToastContent message={message} icon={icon} />, {
    position: 'bottom-center',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false,
  });
};

export default showCustomToast;
export { CustomToastContainer };
