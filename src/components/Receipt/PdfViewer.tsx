import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import * as S from '@/styles/receipt/ReceiptMain.styled';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

interface PdfViewerProps {
  fileUrl: string;
  onClick?: () => void;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, onClick }) => {
  return (
    <S.GridItem onClick={onClick}>
      <S.PdfWrapper>
        <Document file={fileUrl}>
          <Page
            pageNumber={1}
            width={112}
            height={124}
            scale={2}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </S.PdfWrapper>
    </S.GridItem>
  );
};

export default PdfViewer;
