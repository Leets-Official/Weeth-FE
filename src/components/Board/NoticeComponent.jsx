import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import boardChat from '../../assets/images/ic_board_chat.svg';
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
  border-radius: 8px; /* Round the corners */
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
  font-size: 12px;
  line-height: 14.32px;
`;

const StyledNotice = styled.div`
  width: 72%;
  margin: 5px 15% 10px 0;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const NoticeContent = styled.div`
  margin-right: 10%;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
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
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const NoticeComponent = ({ noticeTitle, noticeContent }) => {
  const navi = useNavigate();
  return (
    <Container>
      <BoardContainer>
        <TopRow>
          <StyledName>
            <StyledText onClick={() => navi(`/noticeContent`)}>
              홍길동
            </StyledText>
          </StyledName>
          <StyledDate>00/00</StyledDate>
        </TopRow>
        <StyledNotice>
          <StyledText onClick={() => navi(`/noticeContent`)}>
            {noticeTitle}
          </StyledText>
        </StyledNotice>
        <ContentRow>
          <NoticeContent onClick={() => navi(`/noticeContent`)}>
            {noticeContent}
          </NoticeContent>
          <BottomRow>
            <img src={boardChat} />
            <CommentCount>3</CommentCount>
          </BottomRow>
        </ContentRow>
      </BoardContainer>
    </Container>
  );
};

NoticeComponent.propTypes = {
  noticeTitle: PropTypes.node.isRequired,
  noticeContent: PropTypes.node.isRequired,
};

export default NoticeComponent;
