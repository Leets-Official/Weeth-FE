import React from 'react';
import Modal from 'react-modal';
import PdfViewer from './PdfViewer';

Modal.setAppElement('#root');

interface ReceiptPdfModalProps {
  isOpen: boolean;
  selectedPdf: string;
  onRequestClose: () => void;
}

const ReceiptPdfModal: React.FC<ReceiptPdfModalProps> = ({
  isOpen,
  selectedPdf,
  onRequestClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '80%',
          padding: '20px',
          backgroundColor: '#fff',
        },
      }}
    >
      <button
        type="button"
        onClick={onRequestClose}
        style={{ float: 'right', cursor: 'pointer' }}
      >
        ❌
      </button>
      <PdfViewer fileUrl={selectedPdf} />
    </Modal>
  );
};

export default ReceiptPdfModal;
