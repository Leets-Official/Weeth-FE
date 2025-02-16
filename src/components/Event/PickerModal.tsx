import theme from '@/styles/theme';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  z-index: 15;
  width: 100vw;
  height: 100vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  webkitbackdropfilter: 'blur(2px)';

  .rdp-chevron {
    fill: ${theme.color.main};
  }

  .rdp-selected {
    color: ${theme.color.main};
  }

  .rdp-today {
    color: ${theme.color.main};
  }

  .rdp-selected .rdp-day_button {
    border: 2px solid ${theme.color.main};
  }

  .rdp-caption_label {
    font-size: 20px;
    margin-left: 3px;
  }
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

  width: 325px;
  box-sizing: border-box;

  background-color: ${theme.color.gray[12]};
  border-radius: 20px;
  font-size: 14px;

  gap: 20px;
  padding: 12px;
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
