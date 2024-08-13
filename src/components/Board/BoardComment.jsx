import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { ReactComponent as CommentButton } from '../../assets/images/ic_comment.svg';
import { ReactComponent as ReplyButton } from '../../assets/images/ic_reply.svg';
import { ReactComponent as CommentDeleteButton } from '../../assets/images/ic_comment_delete.svg';
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
  background-color: ${theme.color.grayScale.gray18};
  color: ${theme.color.grayScale.white};
  padding: 0 0 0 10px;
  border-radius: 10px;
  width: calc(100% - 30px);
  margin-top: 5px;
  display: flex;
  flex-direction: column;
`;

const CommentButtonMargin = styled.div`
  margin-right: 5px;
`;

const BoardComment = ({
  commentId,
  name,
  content,
  time,
  recomments = [],
  onDelete,
  onReply,
}) => {
  const [showReplies, setShowReplies] = useState(recomments.length > 0);

  const handleReplyClick = () => {
    if (window.confirm('대댓글을 입력하시겠습니까?')) {
      onReply(commentId); // 대댓글 입력창을 여는 콜백 함수 호출
      setShowReplies(true);
    }
  };

  const handleDeleteRecomment = (recommentId) => {
    if (window.confirm('정말 이 대댓글을 삭제하시겠습니까?')) {
      // 대댓글 삭제 로직을 여기에 추가하십시오.
      console.log('대댓글 삭제:', recommentId);
      // 여기에 실제로 대댓글을 삭제하는 API 요청 등을 추가할 수 있습니다.
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <CommentContainer>
      <BoardCommented>
        <BottomRow>
          <UserName>{name}</UserName>
          <CommentButton alt="" onClick={handleReplyClick} />
          <CommentButtonMargin />
          <CommentDeleteButton onClick={onDelete} />
        </BottomRow>
        <StyledComment>{content}</StyledComment>
        <CommentDate>{formatDateTime(time) || '00/00 00:00'}</CommentDate>

        {showReplies && recomments.length > 0 && (
          <div>
            {recomments.map((recomment) => (
              <ReplyRow key={recomment.id}>
                <ReplyButton
                  alt=""
                  style={{
                    marginRight: '2px',
                    flexShrink: 0,
                  }}
                />
                <BoardReply>
                  <BottomRow>
                    <UserName>{recomment.name}</UserName>
                    <CommentDeleteButton
                      alt=""
                      style={{
                        marginRight: '10px',
                      }}
                      onClick={handleDeleteRecomment}
                    />
                  </BottomRow>
                  <StyledComment>{recomment.content}</StyledComment>
                  <CommentDate>{formatDateTime(recomment.time)}</CommentDate>
                </BoardReply>
              </ReplyRow>
            ))}
          </div>
        )}
      </BoardCommented>
    </CommentContainer>
  );
};

BoardComment.propTypes = {
  commentId: PropTypes.number.isRequired,
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
  onDelete: PropTypes.func.isRequired,
  onReply: PropTypes.func.isRequired,
};

BoardComment.defaultProps = {
  recomments: [], // Default to an empty array if no recomments are provided
};

export default BoardComment;
