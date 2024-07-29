import styled from 'styled-components';
import { useContext } from 'react';
import theme from '../../styles/theme';
import ReceiptInfo from './ReceiptInfo';
import { DuesContext } from '../../hooks/DuesContext';

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

  &::-webkit-scrollbar-thumb:hover {
  }
`;

const GridItem = styled.div`
  flex: 0 0 auto;
  margin-right: 10px;
  padding: 0; /* 패딩 제거 */
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
  &:last-child {
    margin-right: 0;
  }
`;

const GridItemImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const ReceiptMain = () => {
  const { duesData } = useContext(DuesContext);

  // 영수증 데이터를 월별로 묶어주기
  const groupedByMonth = duesData.reduce((acc, curr) => {
    const month = new Date(curr.date).getMonth() + 1;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(curr);
    return acc;
  }, {});

  // 3월 ~ 8월
  const FirstSemester = [3, 4, 5, 6, 7, 8];

  return (
    <StyledReceipt>
      {FirstSemester.map((month) => (
        <div key={month}>
          <StyledMonth>{month}월</StyledMonth>
          {groupedByMonth[month] ? (
            groupedByMonth[month].map((receipt) => (
              <div key={receipt.id}>
                <ReceiptInfo
                  money={`${receipt.amount.toLocaleString()}원`}
                  date={new Date(receipt.date).toLocaleDateString('ko-KR')}
                  memo={receipt.description}
                />
                <ScrollContainer>
                  {receipt.images.length > 0 ? (
                    receipt.images.map((image, index) => (
                      <GridItem key={receipt.id}>
                        <GridItemImage
                          src={image}
                          alt={`영수증 사진 ${index + 1}`}
                        />
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
    </StyledReceipt>
  );
};

export default ReceiptMain;
