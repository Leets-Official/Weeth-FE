import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.mjs';

interface PdfViewerProps {
  fileUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ fileUrl }) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const onDocumentLoadSuccess = () => {
    setPageNumber(1);
  };
  console.log('PDF URL:', fileUrl);

  return (
    <div style={{ textAlign: 'center', width: '100%', maxHeight: '300px' }}>
      <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} width={250} renderTextLayer={false} />
      </Document>
    </div>
  );
};

export default PdfViewer;
