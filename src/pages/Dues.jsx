import styled from 'styled-components';
import { useState, useContext } from 'react';
import theme from '../styles/theme';
import DuesHeader from '../components/Dues/DuesHeader';
import DueCategory from '../components/Dues/DueCategory';
import DuesInfo from '../components/Dues/DuesInfo';
import DuesTitle from '../components/Dues/DuesTitle';
import { DuesContext } from '../hooks/DuesContext';

const StyledDues = styled.div`
  width: 370px;
  height: height: calc(var(--vh, 1vh) * 100);
  font-family: ${theme.font.family.pretendard_regular};
`;

const CategoryWrapper = styled.div`
  margin: 0 30px;
`;

const DuesListBox = styled.div`
  width: 92%;
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  margin: 0 4%;
  background-color: ${theme.color.grayScale.gray18};
`;

const DuesList = styled.div`
  width: 92%;
  margin: 15px 10px 0 10px;
`;

// const Line = styled.div`
//   border: 1px solid;
//   color: #4d4d4d;
//   width: 325px;
//   margin-top: 20px;
//   transform: scaleY(0.2);
// `;

// const MoneyBox = styled.div`
//   margin-top: 35px;
//   font-size: 25px;
//   font-family: ${theme.font.family.pretendard_semiBold};
//   margin-left: 10px;
// `;
// <MoneyBox>
// {myCardinal}기 총 회비: {totalAmount.toLocaleString()}원
// </MoneyBox>
// <Line />

const Dues = () => {
  const { duesData, totalAmount, myCardinal } = useContext(DuesContext);
  const [selected, setSelectedDues] = useState(null);

  const filteredDues =
    selected === null
      ? duesData
      : duesData.filter(
          (dues) => dues.description !== `${myCardinal}기 회비 등록`,
        );
  if (duesData.description === `${myCardinal}기 회비 등록`)
    setSelectedDues('회비');
  return (
    <StyledDues>
      <DuesHeader />
      <DuesTitle />
      <CategoryWrapper>
        <DueCategory setSelectedDues={setSelectedDues} />
      </CategoryWrapper>
      <DuesListBox>
        <DuesList>
          {/* 회비 항목 */}
          {(selected === null || selected === '회비') && (
            <DuesInfo
              key={1}
              dues={totalAmount}
              category="회비" // 회비
              date="2024-04-01"
              memo={`${myCardinal}기 회비 등록`}
            />
          )}
          {/* 지출 항목들 */}
          {selected !== '회비' &&
            filteredDues.map((receipt) => (
              <DuesInfo
                key={receipt.id}
                dues={receipt.amount.string()}
                category="지출" // 지출
                date={receipt.date}
                memo={receipt.description}
              />
            ))}
        </DuesList>
      </DuesListBox>
    </StyledDues>
  );
};

export default Dues;
