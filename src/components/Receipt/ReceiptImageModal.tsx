import React from 'react';
import ReactModal from 'react-modal';
import * as S from '@/styles/receipt/ReceiptMain.styled';
import styled from 'styled-components';

interface ReceiptModalProps {
  isOpen: boolean;
  selectedImage: string;
  onRequestClose: () => void;
}

const StyledModal = styled(ReactModal)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 370px;
  height: 50%;
  padding: 0;
  border: none;
  background: none;
  outline: none;
`;

const ReceiptImageModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  selectedImage,
  onRequestClose,
}) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
      }}
    >
      <S.ModalImage src={selectedImage} title="영수증 큰 이미지" />
    </StyledModal>
  );
};

export default ReceiptImageModal;
