import Modal from 'react-modal';
import * as S from '@/styles/admin/cardinal/CardinalModal.styled';
import closeIcon from '@/assets/images/ic_admin_close.svg';
import { CloseIcon } from '@/components/Admin/Modal/CommonModal';

interface CommonCardinalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: string;
  height?: string;
  top?: string;
  left?: string;
  overlayColor?: string;
  showCloseButton?: boolean;
  position: 'center' | 'absolute' | 'fixed';
  borderBottom?: boolean;
}

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
  borderBottom = false,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="common-cardinal-modal"
      portalClassName="common-cardinal-modal-root"
      style={{
        overlay: { backgroundColor: 'transparent', zIndex: 1000 },
        content: { inset: 'unset' },
      }}
    >
      <S.StyledModalOverlay overlayColor={overlayColor}>
        <S.StyledModalContent
          width={width}
          height={height}
          top={top}
          left={left}
          position={position}
        >
          <S.ModalContainer>
            <S.TitleContainer borderBottom={borderBottom}>
              <S.TitleText>{title}</S.TitleText>
              {showCloseButton && (
                <CloseIcon
                  isCardinalModal
                  src={closeIcon}
                  alt="close"
                  onClick={onClose}
                />
              )}
            </S.TitleContainer>
            <S.MainContent borderBottom={borderBottom}>
              {children}
            </S.MainContent>
            <S.Footer>{footer}</S.Footer>
          </S.ModalContainer>
        </S.StyledModalContent>
      </S.StyledModalOverlay>
    </Modal>
  );
};

export default CommonCardinalModal;
