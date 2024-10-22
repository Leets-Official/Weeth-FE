import { useState, useContext } from 'react';
import DuesHeader from '@/components/Dues/DuesHeader';
import DueCategory from '@/components/Dues/DueCategory';
import DuesInfo from '@/components/Dues/DuesInfo';
import DuesTitle from '@/components/Dues/DuesTitle';
import { DuesContext } from '@/service/DuesContext';
import DuesAPI from '@/service/DuesAPI';
import useCustomBack from '@/router/useCustomBack';
import * as S from '@/styles/dues/Dues.styled';

interface DueProps {
  id: number;
  amount: number;
  date: string;
  description: string;
}

interface DuesContextType {
  duesData: DueProps[] | null;
  description: string;
  totalAmount: number;
  currentAmount: string;
  myCardinal: string;
}

const Dues: React.FC = () => {
  useCustomBack('/home');

  const { duesData, description, totalAmount, currentAmount, myCardinal } =
    useContext<DuesContextType>(DuesContext);

  const [selected, setSelectedDues] = useState<string | null>(null);

  const filteredDues =
    selected === null && duesData
      ? duesData
      : duesData?.filter(
          (dues) => dues.description !== `${myCardinal}기 회비 등록`,
        );

  if (
    duesData &&
    duesData.some((dues) => dues.description === `${myCardinal}기 회비 등록`)
  ) {
    setSelectedDues('회비');
  }

  return (
    <S.StyledDues>
      <DuesAPI />
      <DuesHeader />
      <DuesTitle />
      <S.CategoryWrapper>
        <DueCategory setSelectedDues={setSelectedDues} />
      </S.CategoryWrapper>
      {duesData == null || duesData.length === 0 ? (
        <S.MoneyBox>등록된 회비가 없습니다.</S.MoneyBox>
      ) : (
        <S.DuesListBox>
          <S.MoneyBoxContainer>
            <S.MoneyBox>
              {parseInt(currentAmount, 10).toLocaleString()}원
            </S.MoneyBox>
          </S.MoneyBoxContainer>
          <S.Line />
          <S.DuesList>
            {/* 회비 항목 */}
            {(selected === null || selected === '회비') && (
              <DuesInfo
                key={1}
                dues={totalAmount}
                category="회비" // 회비
                date="2024-04-01"
                memo={description}
              />
            )}
            {/* 지출 항목들 */}
            {selected !== '회비' &&
              filteredDues?.map((receipt) => (
                <DuesInfo
                  key={receipt.id}
                  dues={receipt.amount}
                  category="지출" // 지출
                  date={receipt.date}
                  memo={receipt.description}
                />
              ))}
          </S.DuesList>
        </S.DuesListBox>
      )}
    </S.StyledDues>
  );
};

export default Dues;
