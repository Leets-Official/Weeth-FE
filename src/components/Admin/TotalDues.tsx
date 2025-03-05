import styled from 'styled-components';
import theme from '@/styles/theme';
import {
  TotalDuesWrapper,
  TopDues,
  Title,
} from '@/styles/admin/TotalDues.styled';
import fetchAccountData from '@/api/admin/dues/getAccount';
import { AccountResponse } from '@/types/account';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Box from '@/components/Admin/Box';

interface TotalDuesProps {
  cardinal: number | null;
}

export const BoxWrapper = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  padding: 10px;
`;

const CardinalWrapper = styled.div`
  margin-left: 20px;
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

const formatDate = (time: unknown): string => {
  if (typeof time === 'string' && time.trim() !== '') {
    const formattedDate = dayjs(time).format('YYYY.MM.DD HH:mm');
    return formattedDate || '날짜 없음';
  }
  return '날짜 없음';
};

const TotalDues: React.FC<TotalDuesProps> = ({ cardinal }) => {
  const [title, setTitle] = useState('');
  const [boxData, setBoxData] = useState([
    {
      id: 'box1',
      title: '원금',
      description: '0원',
      last: '-',
      color: '#00DDA8',
    },
    {
      id: 'box2',
      title: '현재',
      description: '0원',
      last: '-',
      color: '#2f2f2f',
    },
    {
      id: 'box3',
      title: '사용',
      description: '0원',
      last: '-',
      color: '#2f2f2f',
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      if (cardinal === null) return;
      try {
        const response: AccountResponse = await fetchAccountData(cardinal);
        if (response.code === 200) {
          const { totalAmount, currentAmount, time, description } =
            response.data;
          setTitle(description);

          setBoxData([
            {
              id: 'box1',
              title: '원금',
              description: `${totalAmount}원`,
              last: formatDate(time),
              color: '#00DDA8',
            },
            {
              id: 'box2',
              title: '현재',
              description: `${currentAmount}원`,
              last: formatDate(time),
              color: '#2f2f2f',
            },
            {
              id: 'box3',
              title: '사용',
              description: `${totalAmount - currentAmount}원`,
              last: formatDate(time),
              color: '#2f2f2f',
            },
          ]);
        }
      } catch (error) {
        console.error('API 호출 중 오류 발생:', error);
        setTitle('총 회비 정보 없음');
        setBoxData([
          {
            id: 'box1',
            title: '원금',
            description: '0원',
            last: '0000.00.00 00:00',
            color: '#00DDA8',
          },
          {
            id: 'box2',
            title: '현재',
            description: '0원',
            last: '0000.00.00 00:00',
            color: '#2f2f2f',
          },
          {
            id: 'box3',
            title: '사용',
            description: '0원',
            last: '0000.00.00 00:00',
            color: '#2f2f2f',
          },
        ]);
      }
    };

    getData();
  }, [cardinal]);

  return (
    <TotalDuesWrapper>
      <TopDues>
        <Title>총 회비</Title>
      </TopDues>
      <InsideDues>
        <CardinalWrapper>{title || '기수 정보 없음'}</CardinalWrapper>
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
