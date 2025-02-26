import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import * as S from '@/styles/receipt/ReceiptMain.styled'; // 스타일 임포트

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

interface PdfViewerProps {
  fileUrl: string;
  onClick: () => void; // 클릭 시 원본 PDF 모달 열기
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl, onClick }) => {
  return (
    <S.GridItem onClick={onClick}>
      <S.PdfWrapper>
        <Document file={fileUrl}>
          <Page
            pageNumber={1}
            width={112} // 🔥 GridItem에 맞게 크기 조정
            height={124} // 🔥 GridItem 높이 유지
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </S.PdfWrapper>
    </S.GridItem>
  );
};

export default PdfViewer;
