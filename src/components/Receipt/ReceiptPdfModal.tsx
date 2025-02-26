/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import Modal from 'react-modal';
import { Document, Page, pdfjs } from 'react-pdf';
import theme from '@/styles/theme';

Modal.setAppElement('#root');

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

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
  // pdf 클릭시 pdf 다운로드
  const openPdfInNewTab = () => {
    window.open(selectedPdf, '_blank');
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
        content: {
          top: '50%',
          left: '50%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '370px',
          height: 'auto',
          padding: '10px',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}
    >
      {/* PDF 썸네일 */}
      <div
        style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          justifyContent: 'center',
          cursor: 'pointer',
        }}
        onClick={openPdfInNewTab}
      >
        <Document file={selectedPdf}>
          <Page
            pageNumber={1}
            width={300}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* 닫기 버튼 */}
      <button
        type="button"
        onClick={onRequestClose}
        style={{
          marginTop: '10px',
          padding: '5px 10px',
          borderRadius: '5px',
          border: 'none',
          backgroundColor: `${theme.color.negative}`,
          color: `${theme.color.gray[100]}`,
          cursor: 'pointer',
        }}
      >
        닫기
      </button>
    </Modal>
  );
};

export default ReceiptPdfModal;
