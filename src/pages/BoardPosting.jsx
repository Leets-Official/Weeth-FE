import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PostingHeader from '../components/Board/PostingHeader';
import { ReactComponent as FileAttach } from '../assets/images/ic_board_fileAttach.svg';
import theme from '../styles/theme';

const StyledPosting = styled.div`
  width: 370px;
`;

const StyledText = styled.div`
  margin-left: 7%;
  color: ${theme.color.grayScale.white};
  font-size: 16px;
  line-height: 19.09px;
`;

/* 임시 */
const StyledTitle = styled.input`
  width: 88%;
  margin-top: 20px;
  margin-bottom: 20px;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-weight: 600;
  outline: none;
`;

const StyledLine = styled.div`
  width: 88%;
  height: 1px;
  margin: 0 7%;
  background-color: ${theme.color.grayScale.gray30};
`;

const StyledContent = styled.textarea`
  width: 88%;
  margin-top: 12px;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  padding: 10px 0;
  outline: none;
  resize: none;
  height: 455px;
`;

const StyledFileAttach = styled.div`
  margin-left: 7%;
  margin-bottom: 148px;
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const Keyboard = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 200px;
  background-color: #333;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(100%);
  transition: transform 0.3s ease-in-out;

  &.active {
    animation: ${slideUp} 0.3s forwards;
  }
`;

const BoardPosting = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  const handleFocus = () => {
    setIsKeyboardVisible(true);
  };

  const handleBlur = () => {
    setIsKeyboardVisible(false);
  };

  return (
    <StyledPosting>
      <PostingHeader />
      <StyledText>
        <StyledTitle type="text" placeholder="제목" />
      </StyledText>
      <StyledLine />
      <StyledText>
        <StyledContent
          placeholder="내용을 입력하세요."
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </StyledText>
      <StyledFileAttach>
        <FileAttach />
      </StyledFileAttach>
      <Keyboard className={isKeyboardVisible ? 'active' : undefined}>
        키보드
      </Keyboard>
    </StyledPosting>
  );
};

export default BoardPosting;
