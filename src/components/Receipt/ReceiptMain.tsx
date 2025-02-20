import { useState } from 'react';
import ReceiptInfo from '@/components/Receipt/ReceiptInfo';
import * as S from '@/styles/receipt/ReceiptMain.styled';
import useGetDuesInfo from '@/api/useGetDuesInfo';
import useGetGlobaluserInfo from '@/api/useGetGlobaluserInfo';
import ReceiptImageModal from './ReceiptImageModal';

interface ReceiptProps {
  id: number;
  date: string;
  amount: number;
  description: string;
  images: string[];
}

interface GroupedByMonth {
  [key: number]: ReceiptProps[];
}

const ReceiptMain: React.FC = () => {
  const { globalInfo } = useGetGlobaluserInfo();
  const cardinal =
    globalInfo?.cardinals?.[globalInfo.cardinals.length - 1] ?? 0;
  const { duesInfo } = useGetDuesInfo(cardinal);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const openModal = (image: string) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage('');
  };

  const groupedByMonth: GroupedByMonth =
    duesInfo?.receipts?.reduce((acc: GroupedByMonth, curr: ReceiptProps) => {
      const month = new Date(curr.date).getMonth() + 1;
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(curr);
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
        <div key={month}>
          <S.StyledMonth>{month}월</S.StyledMonth>
          {groupedByMonth[month] ? (
            groupedByMonth[month].map((receipt) => (
              <div key={receipt.id}>
                <ReceiptInfo
                  money={`${receipt.amount.toLocaleString()}`}
                  date={new Date(receipt.date).toLocaleDateString('ko-KR')}
                  memo={receipt.description}
                />
                <S.ScrollContainer>
                  {receipt.images?.length > 0 ? (
                    receipt.images.map((image, index) => (
                      <S.GridItem key={index} onClick={() => openModal(image)}>
                        <S.GridItemImage
                          src={image}
                          title={`영수증 사진 ${index + 1}`}
                        />
                        <S.OpenModalButton onClick={() => openModal(image)} />
                      </S.GridItem>
                    ))
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
      <ReceiptImageModal
        isOpen={modalIsOpen}
        selectedImage={selectedImage}
        onRequestClose={closeModal}
      />
    </S.StyledReceipt>
  );
};

export default ReceiptMain;
