import Cardinal from '@/components/Member/Cardinal';
import MemberHeader from '@/components/Member/MemberHeader';
import useCustomBack from '@/hooks/useCustomBack';
import UserAPI from '@/api/UserAPI';
import { useState } from 'react';

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
      <MemberHeader />
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
