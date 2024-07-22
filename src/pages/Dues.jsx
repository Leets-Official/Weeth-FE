import styled from 'styled-components';
import { useState } from 'react';

import theme from '../styles/theme';
import DuesHeader from '../components/Dues/DuesHeader';
import DueCategory from '../components/Dues/DueCategory';
import DuesName from '../components/Dues/DuesName';
import mockDues from '../components/mockData/mockDues';
import DuesTitle from '../components/Dues/DuesTitle';

const StyledDues = styled.div`
  width: 370px;
  font-family: ${theme.font.family.pretendard_regular};
`;

const CategoryWrapper = styled.div`
  margin: 0 30px;
`;

const DuesList = styled.div`
  position: absolute;
  background-color: #2e2e2e;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
  max-width: 350px;
  margin: 0px 10px;
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
      <DuesList>
        {filteredDues.map((dues) => (
          <DuesName
            key={dues.name}
            name={dues.name}
            cardinal={dues.cardinal}
            position={dues.position}
          />
        ))}
      </DuesList>
    </StyledDues>
  );
};

export default Dues;
