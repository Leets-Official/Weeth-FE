/* eslint-disable react/no-unstable-nested-components */
import styled, { keyframes } from 'styled-components';
import theme from '@/styles/theme';
import { useNavigate } from 'react-router-dom';

const flowing = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;

const MAX_CONTENT_LENGTH = 30;
const SCROLL_DURATION = 20;

const AnimationLayout = styled.div`
  display: flex;
  background-color: ${theme.color.mainDark};
  margin-top: 0.9375rem;
  cursor: pointer;
  height: 1.875rem;
  align-items: center;
`;

const FlowBox = styled.div`
  position: relative;
  width: 100%;
  height: 1.875rem;
  overflow: hidden;
`;

const FlowText = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 1rem;
  position: relative;
`;

const Label = styled.div`
  display: flex;
  font-family: ${theme.font.semiBold};
  font-size: 0.8125rem;
  color: white;
`;

const TextWrapper = styled.div`
  position: absolute;
  left: 4.0625rem;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const TextTrack = styled.div`
  display: inline-flex;
  white-space: nowrap;
  animation: ${flowing} ${SCROLL_DURATION}s linear infinite;
  animation-delay: 0.5s;
  font-size: 0.8125rem;
`;

const BoldText = styled.span`
  font-family: ${theme.font.semiBold};
  color: white;
`;

const NormalText = styled.span`
  font-family: ${theme.font.regular};
  margin-left: 0.375rem;
  color: white;
`;

const Spacer = styled.span`
  display: inline-block;
  width: 0.9375rem;
`;

const HomeNotice = ({
  title,
  content,
  id,
}: {
  title: string;
  content: string;
  id: number;
}) => {
  const navi = useNavigate();

  const formatContent = (text: string) => {
    return text.length > MAX_CONTENT_LENGTH
      ? `${text.substring(0, MAX_CONTENT_LENGTH)}...`
      : text;
  };

  const handleNotice = () => {
    if (id) {
      navi(`/notice/${id}`);
    }
  };

  const NoticeTextBlock = () => (
    <>
      <BoldText>{title}</BoldText>
      <NormalText>{formatContent(content)}</NormalText>
      <Spacer />
    </>
  );

  const repeatedKeys = ['first', 'second'];

  return (
    <AnimationLayout onClick={handleNotice}>
      <FlowBox>
        <FlowText>
          <Label>📢 공지</Label>
          <TextWrapper>
            <TextTrack>
              {repeatedKeys.map((key) => (
                <span key={`notice-${id}-${key}`}>
                  <NoticeTextBlock />
                </span>
              ))}
            </TextTrack>
          </TextWrapper>
        </FlowText>
      </FlowBox>
    </AnimationLayout>
  );
};

export default HomeNotice;
