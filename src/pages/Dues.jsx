import styled from 'styled-components';
import { useState } from 'react';
import theme from '../styles/theme';
import DuesHeader from '../components/Dues/DuesHeader';
import DueCategory from '../components/Dues/DueCategory';
import DuesInfo from '../components/Dues/DuesInfo';
import mockDues from '../components/mockData/mockDues';
import DuesTitle from '../components/Dues/DuesTitle';

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
  margin: 20px 10px 0 10px;
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
  font-size: 32px;
  font-family: ${theme.font.family.pretendard_semiBold};
  margin-left: 10px;
`;

const Dues = () => {
  const [selectedCardinal, setSelectedCardinal] = useState(null);

  const filteredDues =
    selectedCardinal === null
      ? mockDues
      : mockDues.filter((dues) => dues.cardinal === selectedCardinal);

  return (
    <StyledDues>
      <DuesHeader />
      <DuesTitle />
      <CategoryWrapper>
        <DueCategory setSelectedCardinal={setSelectedCardinal} />
      </CategoryWrapper>
      <DuesListBox>
        <MoneyBoxContainer>
          <MoneyBox>234,234원</MoneyBox>
        </MoneyBoxContainer>
        <Line />
        <DuesList>
          {filteredDues.map((dues) => (
            <DuesInfo
              key={dues.id}
              dues={dues.dues}
              cardinal={dues.cardinal}
              date={dues.date}
              memo={dues.memo}
            />
          ))}
        </DuesList>
      </DuesListBox>
    </StyledDues>
  );
};

export default Dues;
