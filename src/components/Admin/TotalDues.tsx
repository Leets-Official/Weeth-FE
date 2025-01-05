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
  const boxData = [
    {
      id: 'box1',
      title: '원금',
      description: '0원',
      last: '0000.00.00. 00:00',
      color: '#00DDA8',
    },
    {
      id: 'box2',
      title: '현재',
      description: '0원',
      last: '2024.10.24. 15:13',
      color: '#2f2f2f',
    },
    {
      id: 'box3',
      title: '사용',
      description: '0원',
      last: '0000.00.00. 00:00',
      color: '#2f2f2f',
    },
  ];

  return (
    <TotalDuesWrapper>
      <TopDues>
        <Title>총 회비</Title>
      </TopDues>
      <InsideDues>
        <CardinalWrapper>{getDuesText()}</CardinalWrapper>
        <BoxWrapper>
          {boxData.map((box) => (
            <Box
              key={box.id}
              title={box.title}
              description={box.description}
              last={box.last}
              color={box.color}
            />
          ))}
        </BoxWrapper>
      </InsideDues>
    </TotalDuesWrapper>
  );
};
export default TotalDues;
