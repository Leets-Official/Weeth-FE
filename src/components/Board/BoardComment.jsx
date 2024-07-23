import React from 'react';
import styled from 'styled-components';
import { ReactComponent as CommentButton } from '../../assets/images/ic_comment.svg';
import theme from '../../styles/theme';

const BoardContainer = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;

const UserName = styled.div`
  width: 100%;
  font-familiy: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
`;

const StyledComment = styled.div`
  width: 100%; // ?
  margin-top: 10px;
  font-familiy: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  font-weight: 400;
  line-height: 19.09px;
`;

const CommentDate = styled.div`
  margin-top: 5px;
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

const BoardComment = () => {
  return (
    <BoardContainer>
      <BottomRow>
        <UserName>홍길동</UserName>
        <CommentButton />
      </BottomRow>
      <StyledComment>정말 열심히 하셨네요!</StyledComment>
      <CommentDate>00/00 00:00</CommentDate>
    </BoardContainer>
  );
};

export default BoardComment;
