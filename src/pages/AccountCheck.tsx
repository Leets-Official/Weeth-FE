import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Header from '@/components/Header/Header';
import Title from '@/components/AccountCheck/Title';
import AccountButton from '@/components/AccountCheck/AccountButton';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
`;

const AccountCheck: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const kakaoId = localStorage.getItem('kakaoId');
    if (!kakaoId) {
      navigate('/');
    }
  }, []);
  return (
    <Container>
      <Header isAccessible RightButtonType="none" />
      <Title />
      <AccountButton />
    </Container>
  );
};

export default AccountCheck;
