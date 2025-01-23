import React from 'react';
import styled from 'styled-components';
import Header from '@/components/Header/Header';
import Title from '@/components/AccountCheck/Title';
import AccountButton from '@/components/AccountCheck/AccountButtion';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0;
`;

const AccountCheck: React.FC = () => {
  return (
    <Container>
      <Header RightButtonType="none" />
      <Title />
      <AccountButton />
    </Container>
  );
};

export default AccountCheck;
