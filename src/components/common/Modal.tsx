import styled from 'styled-components';
import close from '@/assets/images/ic_close.svg';
import theme from '@/styles/theme';

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

  background-color: ${theme.color.gray[18]};
  border-radius: 20px;
  font-size: 14px;

  gap: 20px;
  padding: 15px;
`;

const Img = styled.img`
  position: fixed;
  top: 15px;
  right: 15px;
  width: 16px;
`;

const Modal = ({
  children,
  hasCloseButton,
  onClose,
}: {
  children: React.ReactNode;
  hasCloseButton: boolean;
  onClose?: () => void;
}) => {
  return (
    <Container onClick={onClose}>
      <Content onClick={(e) => e.stopPropagation()}>
        {hasCloseButton ? (
          <Img
            src={close}
            alt="close"
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        ) : null}
        {children}
      </Content>
    </Container>
  );
};

export default Modal;
