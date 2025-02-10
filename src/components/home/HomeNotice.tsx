import styled, { keyframes } from 'styled-components';
import theme from '@/styles/theme';

const flowing = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
`;

const AnimationLayout = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${theme.color.mainDark};
  margin-top: 15px;
`;

const FlowBox = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  overflow: hidden;
`;

const FlowText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  white-space: nowrap;
`;

const Title = styled.span`
  font-weight: 600;
`;

export const Text = styled.div`
  font-size: 12px;
  font-weight: 400px;
  padding-left: 25px;
  animation: ${flowing} 8s linear infinite;
  display: inline-block;
`;

const HomeNotice = () => {
  return (
    <AnimationLayout>
      <FlowBox>
        <FlowText>
          <Text>
            <Title>📢 제목 test</Title>
          </Text>
        </FlowText>
      </FlowBox>
    </AnimationLayout>
  );
};

export default HomeNotice;
