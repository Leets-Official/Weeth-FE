import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PostingHeader from '../components/Board/PostingHeader';
import FileAttachMenu from '../components/Board/FileAttachMenu';
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

const BoardPosting = ({ initialStudyName, initialStudyContent }) => {
  const navi = useNavigate();
  const [studyName, setStudyName] = useState(initialStudyName);
  const [studyContent, setStudyContent] = useState(initialStudyContent);
  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false); // 모달 상태 추가

  const handleStudyNameChange = (e) => {
    setStudyName(e.target.value);
  };

  const handleBoardContentChange = (e) => {
    setStudyContent(e.target.value);
  };

  const handleBoardClick = () => {
    if (isCompleteEnabled) {
      navi('/board', {
        state: {
          studyName,
          studyContent,
        },
      });
    }
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setIsCompleteEnabled(studyName && studyContent.length >= 1);
  }, [studyName, studyContent]);

  return (
    <StyledPosting>
      <PostingHeader
        isRightButtonEnabled={isCompleteEnabled}
        onCompleteClick={handleBoardClick}
      />
      <StyledText>
        <StyledTitle
          type="text"
          placeholder="제목"
          value={studyName}
          onChange={handleStudyNameChange}
        />
      </StyledText>
      <StyledLine />
      <StyledText>
        <StyledContent
          placeholder="내용을 입력하세요."
          value={studyContent}
          onChange={handleBoardContentChange}
        />
      </StyledText>
      <StyledFileAttach>
        <FileAttach alt="" onClick={handleOpenMenu} />
      </StyledFileAttach>
      <FileAttachMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </StyledPosting>
  );
};

BoardPosting.propTypes = {
  initialStudyName: PropTypes.string,
  initialStudyContent: PropTypes.string,
};

BoardPosting.defaultProps = {
  initialStudyName: '',
  initialStudyContent: '',
};

export default BoardPosting;
