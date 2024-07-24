import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
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

const BoardPosting = ({ initialBoardName, initialBoardContent }) => {
  const navi = useNavigate();
  const [boardName, setBoardName] = useState(initialBoardName);
  const [boardContent, setBoardContent] = useState(initialBoardContent);
  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);

  const handleBoardNameChange = (e) => {
    setBoardName(e.target.value);
  };

  const handleBoardContentChange = (e) => {
    setBoardContent(e.target.value);
  };

  /* const handleFocus = () => {
    setIsKeyboardVisible(true);
  }; 

  /* const handleBlur = () => {
    setIsKeyboardVisible(false);
  }; */

  // Board.jsx로 넘어가서 썼던 내용 보낼 수 있게
  const handleCompleteClick = () => {
    if (isCompleteEnabled) {
      navi('/board', { state: { boardName, boardContent } }); // ?
    }
  };

  useEffect(() => {
    setIsCompleteEnabled(boardName && boardContent.length >= 1); // ?
  }, [boardName, boardContent]);

  return (
    <StyledPosting>
      <PostingHeader
        isRightButtonEnabled={isCompleteEnabled}
        onCompleteClick={handleCompleteClick}
      />
      <StyledText>
        <StyledTitle
          type="text"
          placeholder="제목"
          value={boardName}
          onChange={handleBoardNameChange}
        />
      </StyledText>
      <StyledLine />
      <StyledText>
        <StyledContent
          placeholder="내용을 입력하세요."
          value={boardContent}
          onChange={handleBoardContentChange}
        />
      </StyledText>
      <StyledFileAttach>
        <FileAttach />
      </StyledFileAttach>
    </StyledPosting>
  );
};

BoardPosting.propTypes = {
  initialBoardName: PropTypes.string,
  initialBoardContent: PropTypes.string,
};

BoardPosting.defaultProps = {
  initialBoardName: '',
  initialBoardContent: '',
};

export default BoardPosting;
