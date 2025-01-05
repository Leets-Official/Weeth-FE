import {
  TotalDuesWrapper,
  TopDues,
  Title,
} from '@/styles/admin/TotalDues.styled';
import styled from 'styled-components';
import ExpenditureRecord from './ExpenditureRecord';

const ExpenditureWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Expenditure: React.FC = () => {
  return (
    <TotalDuesWrapper>
      <TopDues>
        <Title>지출 기록</Title>
      </TopDues>
      <ExpenditureWrapper>
        <ExpenditureRecord />
      </ExpenditureWrapper>
    </TotalDuesWrapper>
  );
};

export default Expenditure;
