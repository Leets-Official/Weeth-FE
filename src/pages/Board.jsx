import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import BoardComment from '../components/Board/BoardComment';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
import theme from '../styles/theme';
import Typing from '../components/Board/Typing';

const Container = styled.div`
  width: 370px;
  max-width: 370px;
  min-height: 810px;
  color: ${theme.color.grayScale.white};
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 370px;
  background-color: ${theme.color.grayScale.gray12}; /* Header 배경 색상 추가 */
  top: 0;
  z-index: 1;
`;

const BoardRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 6%;
  margin-top: 90px;
  flex-grow: 1;
`;

const TextContainer = styled.div`
  margin-bottom: 10px;
`;

const BoardNamed = styled.div`
  margin-left: 7%;
  font-size: 24px;
  font-weight: 600;
`;

const SubRow = styled.div`
  display: flex;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
`;

const ComponentRow = styled.div`
  display: flex;
  margin-top: 10px; /* Ensuring gap between components */
  margin-right: 4%;
`;

const UserName = styled.div`
  padding: 0;
  margin-right: 3%;
`;

const StyledDate = styled.div`
  padding: 0;
`;

const BoardContents = styled.div`
  width: 88%;
  margin-top: 20px;
  margin-right: 4%;
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 16px;
  line-height: 19.09px;
`;

const RightMargin = styled.div`
  margin-right: 27%;
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

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  border-bottom: 1px solid ${theme.color.grayScale.gray30};
  padding-bottom: 10px; /* 선 아래 여백 추가 */
`;

const Board = () => {
  const location = useLocation();
  const { boardName, boardContent } = location.state || {
    boardName: '',
    boardContent: '',
  };
  const divRef = useRef(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRegisterComment = () => {
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        text: comment,
      };
      setComments([...comments, newComment]);
      setComment('');
    }
  };

  useEffect(() => {
    const handleVisualViewPortResize = () => {
      const currentVisualViewport = Number(window.visualViewport?.height);
      if (divRef.current) {
        divRef.current.style.height = `${currentVisualViewport - 30}px`;
        window.scrollTo(0, 40);
      }
    };

    handleVisualViewPortResize();

    if (window.visualViewport) {
      window.visualViewport.addEventListener(
        'resize',
        handleVisualViewPortResize,
      );
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          'resize',
          handleVisualViewPortResize,
        );
      }
    };
  }, []);

  return (
    <Container>
      <HeaderWrapper>
        <BoardHeader />
      </HeaderWrapper>
      <BoardRow>
        <TextContainer>
          <BoardNamed>{boardName}</BoardNamed>
          <SubRow>
            <UserName>김위드</UserName>
            <StyledDate>00/00 00:00</StyledDate>
          </SubRow>
          <BoardContents>{boardContent}</BoardContents>
        </TextContainer>
        <ComponentRow>
          <AttachButton filetype="HWP" />
          <AttachButton filetype="PDF" />
          <RightMargin />
        </ComponentRow>
        <BottomRow>
          <BoardChat alt="" />
          <CommentCount>{comments.length}</CommentCount>
        </BottomRow>
        <BoardComment comments={comments} recomments={[]} />
      </BoardRow>
      <Typing
        comment={comment}
        handleCommentChange={handleCommentChange}
        handleRegisterComment={handleRegisterComment}
      />
    </Container>
  );
};

export default Board;
