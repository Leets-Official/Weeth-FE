import UserAPI from '@/api/UserAPI';
import Cardinal from '@/components/Member/Cardinal';
import useCustomBack from '@/hooks/useCustomBack';
import { useState } from 'react';

import Header from '@/components/Header/Header';
import MemberList from '@/components/Member/MemberList';
import * as S from '@/styles/member/MemberList.styled';
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
      <UserAPI />
      <Header title="멤버" RightButtonType="none" />
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
