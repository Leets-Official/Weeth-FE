import styled, { keyframes } from 'styled-components';
import theme from '@/styles/theme';

const flowing = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

const AnimationLayout = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${theme.color.mainDark};
`;

const FlowBox = styled.div`
  position: relative;
  width: 100%;
  height: 46px;
  /* overflow: hidden; */
`;

const FlowText = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  white-space: nowrap;
`;

export const TextDiv = styled.div`
  font-size: 20.003px;
  animation: ${flowing} 8s linear infinite;
  span {
    display: inline-block;
    font-family: 'Gotham';
    font-weight: 600;
    padding: 0 3px;
  }
`;

const HomeNotice = () => {
  return (
    <AnimationLayout>
      <FlowBox>
        <FlowText>
          <TextDiv>test</TextDiv>
        </FlowText>
      </FlowBox>
    </AnimationLayout>
  );
};

export default HomeNotice;
