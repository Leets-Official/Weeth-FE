import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ReactComponent as BoardChat } from '../../assets/images/ic_board_chat.svg';
import theme from '../../styles/theme';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 87px;
  margin: 0 7%;
  padding: 10px 0;
  border-radius: 8px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const StyledText = styled.div`
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-weight: 600;
  font-size: 16px;
  line-height: 19.09px;
`;

const StyledName = styled.div`
  display: flex;
  align-items: flex-start;
  width: 57%;
`;

const StyledDate = styled.div`
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
`;

const StyledStudy = styled.div`
  width: 72%;
  margin: 5px 15% 10px 0;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const StudyContent = styled.div`
  margin-right: 10%;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const StudyComponent = () => {
  const navi = useNavigate();
  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);

  const location = useLocation();
  const { studyName, studyContent } = location.state || {
    studyName: '',
    studyContent: '',
  };

  const handleStudyClick = () => {
    if (isCompleteEnabled) {
      navi('/studyBoard', {
        state: {
          studyName,
          studyContent,
        },
      });
    }
  };

  useEffect(() => {
    setIsCompleteEnabled(studyName && studyContent.length >= 1);
  }, [studyName, studyContent]);

  return (
    <Container>
      <BoardContainer>
        <TopRow>
          <StyledName>
            <StyledText onClick={handleStudyClick}>홍길동</StyledText>
          </StyledName>
          <StyledDate>00/00</StyledDate>
        </TopRow>
        <StyledStudy>
          <StyledText onClick={handleStudyClick}>{studyName}</StyledText>
        </StyledStudy>
        <ContentRow>
          <StudyContent onClick={handleStudyClick}>{studyContent}</StudyContent>
          <BottomRow>
            <BoardChat />
            <CommentCount>3</CommentCount>
          </BottomRow>
        </ContentRow>
      </BoardContainer>
    </Container>
  );
};

export default StudyComponent;
