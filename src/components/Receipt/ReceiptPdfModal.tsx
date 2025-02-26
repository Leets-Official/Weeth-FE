import React from 'react';
import Modal from 'react-modal';
import PdfViewer from '@/components/Receipt/PdfViewer';

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
          height: '60%',
          padding: '10px',
          backgroundColor: '#fff',
        },
      }}
    >
      <PdfViewer fileUrl={selectedPdf} isModal />
    </Modal>
  );
};

export default ReceiptPdfModal;
