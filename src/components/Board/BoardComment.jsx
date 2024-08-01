import React, { useState } from 'react';
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
  line-height: 16.71px;
`;

const StyledComment = styled.div`
  width: 100%;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
`;

const CommentDate = styled.div`
  margin-top: 5px;
  margin-bottom: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
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

const BoardComment = ({ name, content, time, recomments = [] }) => {
  const [showReplies, setShowReplies] = useState(false);

  const handleReplyClick = () => {
    setShowReplies(!showReplies);
  };

  return (
    <CommentContainer>
      <BoardCommented>
        <BottomRow>
          <UserName>{name}</UserName>
          <CommentButton alt="" onClick={handleReplyClick} />
        </BottomRow>
        <StyledComment>{content}</StyledComment>
        <CommentDate>{time}</CommentDate>
        {showReplies &&
          recomments.map((recomment) => (
            <ReplyRow key={recomment.id}>
              <ReplyButton
                alt=""
                style={{
                  marginRight: '10px',
                  flexShrink: 0,
                }}
              />
              <BoardReply>
                <BottomRow>
                  <UserName>{recomment.name}</UserName>
                </BottomRow>
                <StyledComment>{recomment.content}</StyledComment>
                <CommentDate>{recomment.time}</CommentDate>
              </BoardReply>
            </ReplyRow>
          ))}
      </BoardCommented>
    </CommentContainer>
  );
};

BoardComment.propTypes = {
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  recomments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
    }),
  ),
};

BoardComment.defaultProps = {
  recomments: [], // Default to an empty array if no recomments are provided
};

export default BoardComment;
