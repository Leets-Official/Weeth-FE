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
  margin-top: 15px;
  cursor: pointer;
  height: 30px;
  align-items: center;
`;

const FlowBox = styled.div`
  position: relative;
  width: 100%;
  height: 30px;
  overflow: hidden;
`;

const FlowText = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 16px;
  position: relative;
`;

const Label = styled.div`
  display: flex;
  font-family: ${theme.font.semiBold};
  font-size: 13px;
  color: white;
`;

const TextWrapper = styled.div`
  position: absolute;
  left: 65px;
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
  font-size: 13px;
`;

const BoldText = styled.span`
  font-family: ${theme.font.semiBold};
  color: white;
`;

const NormalText = styled.span`
  font-family: ${theme.font.regular};
  margin-left: 6px;
  color: white;
`;

const Spacer = styled.span`
  display: inline-block;
  width: 20px;
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
