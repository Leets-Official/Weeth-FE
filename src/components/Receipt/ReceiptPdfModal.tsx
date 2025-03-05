import React from 'react';
import Modal from 'react-modal';
import { Document, Page, pdfjs } from 'react-pdf';
import styled from 'styled-components';
import theme from '@/styles/theme';
import Close from '@/assets/images/ic_close.svg';

Modal.setAppElement('#root');

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

interface ReceiptPdfModalProps {
  isOpen: boolean;
  selectedPdf: string;
  onRequestClose: () => void;
}

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 370px;
  height: auto;
  padding: 15px;
  background-color: ${theme.color.gray[18]};
  border-radius: 10px;
  outline: none;
`;

const ThumbnailContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ReceiptPdfModal: React.FC<ReceiptPdfModalProps> = ({
  isOpen,
  selectedPdf,
  onRequestClose,
}) => {
  const openPdfInNewTab = () => {
    window.open(selectedPdf, '_blank');
  };

  return (
    <StyledModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
      }}
    >
      <CloseButton onClick={onRequestClose}>
        <img src={Close} alt="닫기" />
      </CloseButton>
      <ThumbnailContainer onClick={openPdfInNewTab}>
        <Document file={selectedPdf}>
          <Page
            pageNumber={1}
            width={300}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </ThumbnailContainer>
    </StyledModal>
  );
};

export default ReceiptPdfModal;
