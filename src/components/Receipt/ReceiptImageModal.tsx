import React from 'react';
import ReactModal from 'react-modal';
import * as S from '@/styles/receipt/ReceiptMain.styled';

interface ReceiptModalProps {
  isOpen: boolean;
  selectedImage: string;
  onRequestClose: () => void;
}

const ReceiptImageModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  selectedImage,
  onRequestClose,
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '45%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '0',
          border: 'none',
          background: 'none',
          width: '50%',
          height: '50%',
          overflow: 'hidden',
        },
      }}
    >
      <S.ModalImage src={selectedImage} title="영수증 큰 이미지" />
    </ReactModal>
  );
};

export default ReceiptImageModal;
