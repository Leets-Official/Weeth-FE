import styled from 'styled-components';
import theme from '@/styles/theme';
import {
  TotalDuesWrapper,
  TopDues,
  Title,
} from '@/styles/admin/TotalDues.styled';
import Box from './Box';

interface TotalDuesProps {
  getDuesText: () => string;
}

const BoxWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 10px;
`;

const CardinalWrapper = styled.div`
  margin-left: 30px;
`;

const InsideDues = styled.div`
  width: 100%;
  height: 274px;
  font-size: 24px;
  font-family: ${theme.font.semiBold};
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const TotalDues: React.FC<TotalDuesProps> = ({ getDuesText }) => {
  return (
    <TotalDuesWrapper>
      <TopDues>
        <Title>총 회비</Title>
      </TopDues>
      <InsideDues>
        <CardinalWrapper>{getDuesText()}</CardinalWrapper>
        <BoxWrapper>
          <Box
            title="원금"
            description="0원"
            last="0000.00.00. 00:00"
            color="#00DDA8"
          />
          <Box
            title="현재"
            description="0원"
            last="2024.10.24. 15:13"
            color="#2f2f2f"
          />
          <Box
            title="사용"
            description="0원"
            last="0000.00.00. 00:00"
            color="#2f2f2f"
          />
        </BoxWrapper>
      </InsideDues>
    </TotalDuesWrapper>
  );
};
export default TotalDues;
