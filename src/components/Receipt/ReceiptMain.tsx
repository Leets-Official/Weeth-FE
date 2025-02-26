import { useState } from 'react';
import ReceiptInfo from '@/components/Receipt/ReceiptInfo';
import * as S from '@/styles/receipt/ReceiptMain.styled';
import useGetDuesInfo, { Receipt } from '@/api/useGetDuesInfo';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import ReceiptImageModal from '@/components/Receipt/ReceiptImageModal';
import ReceiptPdfModal from '@/components/Receipt/ReceiptPdfModal'; // ✅ PDF 모달 추가
import PdfViewer from '@/components/Receipt/PdfViewer'; // ✅ PDF 미리보기 추가

interface GroupedByMonth {
  [key: string]: Receipt[];
}

const ReceiptMain: React.FC = () => {
  const { globalInfo } = useGetGlobaluserInfo();
  const cardinal =
    globalInfo?.cardinals?.[globalInfo.cardinals.length - 1] ?? 0;
  const { duesInfo } = useGetDuesInfo(cardinal);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [pdfModalOpen, setPdfModalOpen] = useState<boolean>(false); // ✅ PDF 모달 상태 추가
  const [selectedPdf, setSelectedPdf] = useState<string>('');

  const openImageModal = (image: string) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const openPdfModal = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    setPdfModalOpen(true);
  };

  const closeModals = () => {
    setModalIsOpen(false);
    setPdfModalOpen(false);
    setSelectedImage('');
    setSelectedPdf('');
  };

  // 파일 확장자를 판별하는 함수
  const isPdfFile = (url: string) => url.toLowerCase().endsWith('.pdf');

  const groupedByMonth: GroupedByMonth =
    duesInfo?.receipts?.reduce<GroupedByMonth>((acc, curr) => {
      const dateParts = curr.date.split('-').map((part) => parseInt(part, 10));
      const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
      const month = date.getMonth() + 1;
      const monthKey = month.toString();

      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(curr);
      return acc;
    }, {} as GroupedByMonth) || {};

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  let months: number[] = [];
  if (currentMonth >= 3 && currentMonth <= 8) {
    months = [3, 4, 5, 6, 7, 8];
  } else {
    months = [9, 10, 11, 12, 1, 2];
  }

  return (
    <S.StyledReceipt>
      {months.map((month) => (
        <div key={month.toString()}>
          <S.StyledMonth>{month}월</S.StyledMonth>
          {groupedByMonth[month.toString()] ? (
            groupedByMonth[month.toString()].map((receipt) => (
              <div key={receipt.id}>
                <ReceiptInfo
                  money={`${receipt.amount.toLocaleString()}`}
                  date={new Date(receipt.date).toLocaleDateString('ko-KR')}
                  memo={receipt.description}
                />
                <S.ScrollContainer>
                  {receipt.fileUrls.length > 0 ? (
                    receipt.fileUrls.map((file) =>
                      isPdfFile(file.fileUrl) ? (
                        <PdfViewer
                          key={file.fileId}
                          fileUrl={file.fileUrl}
                          onClick={() => openPdfModal(file.fileUrl)}
                        />
                      ) : (
                        <S.GridItem
                          key={file.fileId}
                          onClick={() => openImageModal(file.fileUrl)}
                        >
                          <S.GridItemImage
                            src={file.fileUrl}
                            title="영수증 이미지"
                          />
                        </S.GridItem>
                      ),
                    )
                  ) : (
                    <div> </div>
                  )}
                </S.ScrollContainer>
              </div>
            ))
          ) : (
            <div> </div>
          )}
          <S.Line />
        </div>
      ))}

      {/* ✅ 이미지 미리보기 모달 */}
      <ReceiptImageModal
        isOpen={modalIsOpen}
        selectedImage={selectedImage}
        onRequestClose={closeModals}
      />

      {/* ✅ PDF 미리보기 모달 */}
      <ReceiptPdfModal
        isOpen={pdfModalOpen}
        selectedPdf={selectedPdf}
        onRequestClose={closeModals}
      />
    </S.StyledReceipt>
  );
};

export default ReceiptMain;
