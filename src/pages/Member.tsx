import Cardinal from '@/components/Member/Cardinal';
import MemberHeader from '@/components/Member/MemberHeader';
import useCustomBack from '@/router/useCustomBack';
import UserAPI from '@/service/UserAPI';
import { useState } from 'react';

import MemberList from '@/components/Member/MemberList';
import * as S from '@/styles/memeber/MemberList.styled';

const Member = () => {
  useCustomBack('/home');
  const [selectedCardinal, setSelectedCardinal] = useState<number>(0);

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
        <MemberList selectedCardinal={selectedCardinal} />
        <S.Margin />
      </S.ListWrapper>
    </S.Wrapper>
  );
};

export default Member;
