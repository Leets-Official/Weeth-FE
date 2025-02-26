import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  padding-top: 0;
  margin: 25px 25px 20px 25px;
`;

const MainTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`;

const Title: React.FC = () => {
  return (
    <Container>
      <MainTitle>함께하는 동아리 With, Weeth</MainTitle>
      <SubTitle>
        카카오 로그인이 처음이신 분들만
        <br />
        <span
          style={{
            color: '#508FFF',
          }}
        >
          딱 한 번{' '}
        </span>
        보이는 페이지예요.
      </SubTitle>
    </Container>
  );
};

export default Title;
