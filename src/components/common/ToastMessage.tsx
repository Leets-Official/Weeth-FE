import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import warningIcon from '@/assets/images/ic_toast_warning.svg';
import theme from '@/styles/theme';

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
interface CustomToastContentProps {
  message: string;
  icon?: string;
}

const CustomToastContent: React.FC<CustomToastContentProps> = ({
  message,
  icon,
}) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {icon && <IconImg src={icon} alt="Icon" />}
    <span>{message}</span>
  </div>
);

const showToast = (type: 'success' | 'info' | 'error', message: string) => {
  const icon = type === 'error' ? warningIcon : undefined;
  toast[type](<CustomToastContent message={message} icon={icon} />, {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false,
  });
};

export const toastSuccess = (message: string) => showToast('success', message);
export const toastInfo = (message: string) => showToast('info', message);
export const toastError = (message?: string) =>
  showToast('error', message || '오류가 발생했습니다!');

export { CustomToastContainer };
