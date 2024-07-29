import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
import BoardComment from '../components/Board/BoardComment';
// import BoardPosting from './BoardPosting';
import Typing from '../components/Board/Typing';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
// import { ReactComponent as RegisterComment } from '../assets/images/ic_send.svg';
import theme from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  min-height: 810px;
  color: ${theme.color.grayScale.white};
`;

/* Container : display: flex;
  flex-direction: column; */

const HeaderWrapper = styled.div`
  position: fixed;
  width: 370px;
  background-color: ${theme.color.grayScale.gray12}; /* Header 배경 색상 추가 */
  top: 0;
  z-index: 1;
`;

const StudyRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 6%;
  margin-top: 90px;
  flex-grow: 1;
`;

const TextContainer = styled.div`
  margin: 0 0 7%; 10px;
  padding: 0;
`;

const StudyNamed = styled.div`
  maring-left: 7%;
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
  margin-top: 10px;
  margin: 40px 4% 0 0;
`;

const UserName = styled.div`
  padding: 0;
  margin-right: 3%;
`;

const StyledDate = styled.div`
  padding: 0;
`;

const StudyContents = styled.div`
  width: 88%;
  margin-top: 20px;
  margin-right: 4%;
  font-family: ${theme.font.family.pretendard_regular};
  weight: 400;
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

const BoardDetail = () => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  const location = useLocation();
  const { studyTitle, studyContent } = location.state || {
    studyTitle: '',
    studyContent: '',
  };

  useEffect(() => {
    const storedComments = JSON.parse(localStorage.getItem('comments')) || [];
    setComments(storedComments);

    const storedCommentCount = localStorage.getItem('commentCount');
    if (storedCommentCount !== null) {
      setCommentCount(parseInt(storedCommentCount, 10));
    } else {
      setCommentCount(storedComments.length);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
    localStorage.setItem('commentCount', comments.length.toString());
    setCommentCount(comments.length);
  }, [comments]);

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

  const handleMenuClick = (action) => {
    switch (action) {
      case 'edit':
        // Handle edit action
        console.log('Edit clicked');
        break;
      case 'delete':
        // Handle delete action
        console.log('Delete clicked');
        break;
      default:
        break;
    }
  };

  return (
    <Container>
      <HeaderWrapper>
        <BoardHeader onMenuClick={handleMenuClick} showModal />
      </HeaderWrapper>
      <StudyRow>
        <TextContainer>
          <StudyNamed>{studyTitle}</StudyNamed>
          <SubRow>
            <UserName>김위드</UserName>
            <StyledDate>00/00 00:00</StyledDate>
          </SubRow>
          <StudyContents>{studyContent}</StudyContents>
        </TextContainer>
        <ComponentRow>
          <AttachButton filetype="HWP" />
          <AttachButton filetype="PDF" />
          <RightMargin />
        </ComponentRow>
        <BottomRow>
          <BoardChat alt="" />
          <CommentCount>{commentCount}</CommentCount>
        </BottomRow>
        <BoardComment comments={comments} recomments={[]} />
      </StudyRow>
      <Typing
        comment={comment}
        handleCommentChange={handleCommentChange}
        handleRegisterComment={handleRegisterComment}
      />
    </Container>
  );
};

/* StudyBoard.propTypes = {
  studyName: PropTypes.string.isRequired,
  studyContent: PropTypes.string.isRequired,
}; */

export default BoardDetail;
