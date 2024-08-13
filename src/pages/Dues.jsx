import styled from 'styled-components';
import { useState, useContext } from 'react';
import theme from '../styles/theme';
import DuesHeader from '../components/Dues/DuesHeader';
import DueCategory from '../components/Dues/DueCategory';
import DuesInfo from '../components/Dues/DuesInfo';
import DuesTitle from '../components/Dues/DuesTitle';
import { DuesContext } from '../hooks/DuesContext';
import DuesAPI from '../hooks/DuesAPI';

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
  margin: 0px 10px 0 10px;
`;

const Line = styled.div`
  border: 1px solid;
  color: #4d4d4d;
  width: 325px;
  margin-top: 20px;
  transform: scaleY(0.2);
`;

const MoneyBoxContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-top: 35px;
`;

const MoneyBox = styled.div`
  font-size: 25px;
  font-family: ${theme.font.family.pretendard_semiBold};
  margin-left: 15px;
  align-items: start;
`;

const Dues = () => {
  const { duesData, totalAmount, currentAmount, myCardinal } =
    useContext(DuesContext);
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
      <DuesAPI />
      <DuesHeader />
      <DuesTitle />
      <CategoryWrapper>
        <DueCategory setSelectedDues={setSelectedDues} />
      </CategoryWrapper>
      {duesData == null ? (
        <MoneyBox>등록된 회비가 없습니다.</MoneyBox>
      ) : (
        <DuesListBox>
          <MoneyBoxContainer>
            <MoneyBox>{currentAmount}원</MoneyBox>
          </MoneyBoxContainer>
          <Line />
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
                  dues={receipt.amount}
                  category="지출" // 지출
                  date={receipt.date}
                  memo={receipt.description}
                />
              ))}
          </DuesList>
        </DuesListBox>
      )}
    </StyledDues>
  );
};

export default Dues;
