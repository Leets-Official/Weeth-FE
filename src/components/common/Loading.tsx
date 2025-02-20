import Lottie from 'lottie-react';
import animationData from '@/components/common/WeethLoading.json';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyAnimation = () => {
  return (
    <Container>
      <Lottie animationData={animationData} loop style={{ width: '100px' }} />
    </Container>
  );
};

export default MyAnimation;
