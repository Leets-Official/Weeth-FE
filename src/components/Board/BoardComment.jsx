import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as CommentButton } from '../../assets/images/ic_comment.svg';
import { ReactComponent as ReplyButton } from '../../assets/images/ic_reply.svg';
import theme from '../../styles/theme';

const CommentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BoardCommented = styled.div`
  padding: 0;
  border-radius: 10px;
`;

const UserName = styled.div`
  width: 100%;
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
`;

const StyledComment = styled.div`
  width: 100%;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  font-weight: 400;
  line-height: 19.09px;
`;

const CommentDate = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`;

const ReplyRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 10px;
`;

const BoardReply = styled.div`
  flex-grow: 1;
  background-color: ${theme.color.grayScale.gray18};
  color: ${theme.color.grayScale.white};
  padding: 0 10px;
  border-radius: 10px;
`;

const BoardComment = ({ comments, recomments }) => {
  // 댓글 목록
  return (
    <CommentContainer>
      {comments.map((comment) => (
        <BoardCommented key={comment.id}>
          <BottomRow>
            <UserName>홍길동</UserName>
            <CommentButton alt="" />
          </BottomRow>
          <StyledComment>{comment.text}</StyledComment>
          <CommentDate>00/00 00:00</CommentDate>
        </BoardCommented>
      ))}

      {recomments.map((recomment) => (
        <ReplyRow>
          <ReplyButton
            alt=""
            style={{
              marginRight: '10px',
              flexShrink: 0,
            }}
          />
          <BoardReply key={recomment.id}>
            <BottomRow>
              <UserName>김위드</UserName>
            </BottomRow>
            <StyledComment>대댓글</StyledComment>
            <CommentDate>00/00 00:00</CommentDate>
          </BoardReply>
        </ReplyRow>
      ))}
    </CommentContainer>
  );
};

BoardComment.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.string).isRequired,
  recomments: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default BoardComment;
