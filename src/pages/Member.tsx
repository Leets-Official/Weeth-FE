import Header from '@/components/Header/Header';
import MemberList from '@/components/Member/MemberList';
import useCustomBack from '@/hooks/useCustomBack';
import theme from '@/styles/theme';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 370px;
  font-family: ${theme.font.regular};
  margin-bottom: 50px;
`;

const Member = () => {
  useCustomBack('/home');
  const [searchParams] = useSearchParams();
  const cardinal = searchParams.get('cardinal');
  const [selectedCardinal, setSelectedCardinal] = useState<number | null>(
    Number(cardinal) || null,
  );

  return (
    <Wrapper>
      <Header RightButtonType="none" isAccessible>
        멤버
      </Header>
      <MemberList />
    </Wrapper>
  );
};

export default Member;
