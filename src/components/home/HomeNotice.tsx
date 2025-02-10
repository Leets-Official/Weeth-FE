import styled, { keyframes } from 'styled-components';
import theme from '@/styles/theme';
import { useGetRecentNotice } from '@/api/useGetBoardInfo';

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
  font-family: ${theme.font.regular};
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
  font-family: ${theme.font.semiBold};
  font-size: 12px;
  padding-left: 25px;
`;

const Title = styled.span`
  font-family: ${theme.font.semiBold};
`;

export const Text = styled.div`
  font-size: 12px;
  animation: ${flowing} 8s linear infinite;
  display: inline-block;
`;

const HomeNotice = () => {
  const { recentNotices, isLoading } = useGetRecentNotice();

  console.log(recentNotices);
  return (
    <AnimationLayout>
      <FlowBox>
        <FlowText>
          <Title>📢 공지</Title>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <Text>
              <Title>{recentNotices[0].title}</Title>
              &nbsp;{recentNotices[0].content}
            </Text>
          )}
        </FlowText>
      </FlowBox>
    </AnimationLayout>
  );
};

export default HomeNotice;
