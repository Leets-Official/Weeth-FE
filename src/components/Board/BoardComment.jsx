import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CommentButton } from '../../assets/images/ic_comment.svg';
import { ReactComponent as ReplyButton } from '../../assets/images/ic_reply.svg';
import theme from '../../styles/theme';

const CommentContainer = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
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

const StyledReplyButton = styled(ReplyButton)`
  margin-right: 10px;
  flex-shrink: 0;
`;

const BoardReply = styled.div`
  flex-grow: 1;
  background-color: ${theme.color.grayScale.gray18};
  color: ${theme.color.grayScale.white};
  padding: 0 10px;
  border-radius: 10px;
`;

const BoardComment = () => {
  return (
    <CommentContainer>
      <BottomRow>
        <UserName>홍길동</UserName>
        <CommentButton />
      </BottomRow>
      <StyledComment>정말 열심히 하셨네요!</StyledComment>
      <CommentDate>00/00 00:00</CommentDate>
      <ReplyRow>
        <StyledReplyButton />
        <BoardReply>
          <BottomRow>
            <UserName>홍길동</UserName>
          </BottomRow>
          <StyledComment>정말 열심히 하셨네요!</StyledComment>
          <CommentDate>00/00 00:00</CommentDate>
        </BoardReply>
      </ReplyRow>
    </CommentContainer>
  );
};

export default BoardComment;
