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

interface ExpenditureProps {
  cardinal: number | null;
}

const Expenditure: React.FC<ExpenditureProps> = ({ cardinal }) => {
  return (
    <TotalDuesWrapper>
      <TopDues>
        <Title>지출 기록</Title>
      </TopDues>
      <ExpenditureWrapper>
        <ExpenditureRecord cardinal={cardinal} />
      </ExpenditureWrapper>
    </TotalDuesWrapper>
  );
};

export default Expenditure;
