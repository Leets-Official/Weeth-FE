import Lottie from 'lottie-react';
import animationData from '@/components/common/WeethLoading.json';
import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(31, 31, 31, 0.5);
  z-index: 1000;
`;

const Loading = () => {
  return (
    <Container>
      <Lottie animationData={animationData} loop style={{ width: '100px' }} />
    </Container>
  );
};

export default Loading;
