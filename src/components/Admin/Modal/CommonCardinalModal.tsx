import Modal from 'react-modal';
import { styled } from 'styled-components';
import theme from '@/styles/theme';
import { CloseIcon } from './CommonModal';

interface CommonCardinalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer: React.ReactNode;
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  overlayColor?: string;
  showCloseButton?: string;
  position: 'center' | 'absolute' | 'fixed';
}

const StyledModalOverlay = styled.div<{ overlayColor?: string }>`
  background-color: ${(props) => props.overlayColor || 'rgba(0,0,0,0.5)'};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledModalContent = styled.div<{
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  position?: string;
}>`
  width: ${(props) => props.width || '500px'};
  height: ${(props) => props.height || 'auto'};
  position: ${(props) => props.position || 'center'};
  top: ${(props) => props.top || '50%'};
  left: ${(props) => props.left || '50%'};
  transform: ${(props) =>
    props.position === 'center' ? 'translate(-50%, -50%)' : 'none'};
  border-radius: 8px;
  background-color: ${theme.color.gray[100]};
  padding: 0;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const TitleContainer = styled.div`
  background-color: ${theme.color.gray[100]};
  width: 100%;
  height: 96px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const Footer = styled.div`
  background-color: ${theme.color.gray[100]};
  width: 100%;
  height: 96px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  position: absolute;
  bottom: 0;
`;

const CommonCardinalModal: React.FC<CommonCardinalModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  width = '500px',
  height = 'auto',
  top = '50%',
  left = '50%',
  overlayColor = 'rgba(0,0,0,0.5)',
  showCloseButton = true,
  position = 'center',
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: 'transparent' },
        content: { inset: 'unset' },
      }}
    >
      <StyledModalOverlay overlayColor={overlayColor}>
        <StyledModalContent
          width={width}
          height={height}
          top={top}
          left={left}
          position={position}
        >
          <ModalContainer>
            <TitleContainer>
              <Title>{title}</Title>
              {showCloseButton && (
                <CloseIcon src={CloseIcon} alt="close" onClick={onClose} />
              )}
            </TitleContainer>
            <MainContent>{children}</MainContent>
            <Footer>{footer}</Footer>
          </ModalContainer>
        </StyledModalContent>
      </StyledModalOverlay>
    </Modal>
  );
};

export default CommonCardinalModal;
