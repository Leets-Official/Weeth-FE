import theme from '@/styles/theme';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const scaleIn = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0.9);
    opacity: 0;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
`;

const Container = styled.div`
  position: absolute;
  z-index: 15;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(256, 256, 256, 0.3);
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 246px;
  height: 248px;
  box-sizing: border-box;

  background-color: ${theme.color.gray[12]};
  border-radius: 10px;
  font-size: 14px;

  gap: 20px;
  // padding: 12px;
  animation: ${scaleIn} 0.3s ease-in-out;
`;

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose?: () => void;
}) => {
  return (
    <Container onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>{children}</Content>
    </Container>
  );
};

export default Modal;
