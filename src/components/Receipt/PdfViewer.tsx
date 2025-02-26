import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import * as S from '@/styles/receipt/ReceiptMain.styled';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

interface PdfViewerProps {
  fileUrl: string;
  isModal?: boolean;
  onClick?: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  fileUrl,
  isModal = false,
  onClick,
}) => {
  return (
    <S.GridItem onClick={onClick} $isModal={isModal}>
      <S.PdfWrapper $isModal={isModal}>
        <Document file={fileUrl}>
          <Page
            pageNumber={1}
            width={isModal ? 1000 : 112}
            height={isModal ? 1300 : 124}
            scale={isModal ? 0.5 : 1}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </S.PdfWrapper>
    </S.GridItem>
  );
};

export default PdfViewer;
