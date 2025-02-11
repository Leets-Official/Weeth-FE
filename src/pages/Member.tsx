import Header from '@/components/Header/Header';
import Cardinal from '@/components/Member/Cardinal';
import MemberList from '@/components/Member/MemberList';
import useCustomBack from '@/hooks/useCustomBack';
import * as S from '@/styles/member/MemberList.styled';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const Member = () => {
  useCustomBack('/home');
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const [selectedCardinal, setSelectedCardinal] = useState<number>(
    Number(cardinal) || 0,
  );

  return (
    <S.Wrapper>
      <b>바보</b>
      <S.Bold>바보</S.Bold>
      <Header RightButtonType="none" isAccessible>
        멤버
      </Header>
      <S.CardinalWrapper>
        <Cardinal
          selectedCardinal={selectedCardinal}
          setSelectedCardinal={setSelectedCardinal}
        />
      </S.CardinalWrapper>
      <S.ListWrapper>
        <MemberList />
        <S.Margin />
      </S.ListWrapper>
    </S.Wrapper>
  );
};

export default Member;
