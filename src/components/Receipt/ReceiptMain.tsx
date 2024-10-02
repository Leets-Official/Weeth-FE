import styled from 'styled-components';
import { useContext, useState } from 'react';
import ReactModal from 'react-modal';
import theme from '@/styles/theme';
import ReceiptInfo from '@/components/Receipt/ReceiptInfo';
import { DuesContext } from '@/service/DuesContext';
import DuesAPI from '@/service/DuesAPI';

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

const StyledReceipt = styled.div`
  width: 370px;
  height: calc(var(--vh, 1vh) * 100);
  font-family: ${theme.font.family.pretendard_regular};
`;

const Line = styled.div`
  border: 1px solid;
  color: #4d4d4d;
  width: 88%;
  margin: 15px 6% 0 6%;
  transform: scaleY(0.2);
`;

const StyledMonth = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 18px;
  margin: 15px 0 0 6%;
`;

const ScrollContainer = styled.div`
  display: flex;
  width: 88%;
  margin: 15px 6% 0 6%;
  overflow-x: auto;
  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
  }
`;

const GridItem = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 0;
  background-color: ${theme.color.grayScale.gray18};
  width: 56%;
  height: 124px;
  color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  &:last-child {
    margin-right: 0;
  }
`;

const OpenModalButton = styled.button`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: transparent;
  border: none;
`;

const GridItemImage = styled.embed`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  scroll: no;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ModalImage = styled.embed`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ReceiptMain: React.FC = () => {
  const { duesData } = useContext(DuesContext);
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

  const groupedByMonth: GroupedByMonth = duesData.reduce((acc: GroupedByMonth, curr: ReceiptProps) => {
    const month = new Date(curr.date).getMonth() + 1;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(curr);
    return acc;
  }, {});

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;

  let months: number[] = [];
  if (currentMonth >= 3 && currentMonth <= 8) {
    months = [3, 4, 5, 6, 7, 8];
  } else {
    months = [9, 10, 11, 12, 1, 2];
  }

  return (
    <StyledReceipt>
      <DuesAPI />
      {months.map((month) => (
        <div key={month}>
          <StyledMonth>{month}월</StyledMonth>
          {groupedByMonth[month] ? (
            groupedByMonth[month].map((receipt) => (
              <div key={receipt.id}>
                <ReceiptInfo
                  money={`${receipt.amount.toLocaleString()}`}
                  date={new Date(receipt.date).toLocaleDateString('ko-KR')}
                  memo={receipt.description}
                />
                <ScrollContainer>
                  {receipt.images.length > 0 ? (
                    receipt.images.map((image, index) => (
                      <GridItem onClick={() => openModal(image)} key={`${receipt.id}-${index}`}>
                        <GridItemImage
                          src={image}
                          title={`영수증 사진 ${index + 1}`}
                        />
                        <OpenModalButton onClick={() => openModal(image)} />
                      </GridItem>
                    ))
                  ) : (
                    <div> </div>
                  )}
                </ScrollContainer>
              </div>
            ))
          ) : (
            <div> </div>
          )}
          <Line />
        </div>
      ))}
      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
          content: {
            top: '45%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '0',
            border: 'none',
            background: 'none',
            width: '50%',
            height: '50%',
            overflow: 'hidden',
          },
        }}
      >
        <ModalImage src={selectedImage} title="영수증 큰 이미지" />
      </ReactModal>
    </StyledReceipt>
  );
};

export default ReceiptMain;
