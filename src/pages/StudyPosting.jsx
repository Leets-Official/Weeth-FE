/* eslint-disable no-alert */
/* eslint-disable no-console */
import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BoardContext } from '../service/BoardContext';
import PostingHeader from '../components/Board/PostingHeader';
import FileAttachMenu from '../components/Board/FileAttachMenu';
import fileAttach from '../assets/images/ic_board_fileAttach.svg';
import theme from '../styles/theme';
import { replaceNewLines } from '../service/Utils';

const StyledPosting = styled.div`
  width: 370px;
`;

const StyledText = styled.div`
  margin: 0 7%;
  color: ${theme.color.grayScale.white};
  font-size: 16px;
`;

const StyledTitle = styled.input`
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20pnx;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  outline: none;

  font-size: 16px; // 확대 방지
`;

const StyledLine = styled.div`
  width: 325px;
  height: 1px;
  margin: 0 25px;
  background-color: ${theme.color.grayScale.gray30};
`;

const StyledContent = styled.textarea`
  width: 100%;
  margin-top: 12px;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_regular};
  padding: 10px 0;
  outline: none;
  resize: none;
  height: 455px;

  font-size: 16px; // 확대 방지
`;

const StudyPosting = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    title: initialTitle = '',
    content: initialContent = '',
    postId,
  } = location.state || {};

  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const { setBoardData } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [boardPost, setBoardPost] = useState({
    title: initialTitle,
    content: initialContent,
  });

  useEffect(() => {
    setIsCompleteEnabled(!!boardPost.title && boardPost.content.length >= 1);
  }, [boardPost.title, boardPost.content]);

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoardPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const saveBoard = async () => {
    const formData = new FormData();
    boardPost.content = replaceNewLines(boardPost.content);
    console.log(boardPost);

    // JSON 데이터를 'dto' 필드로 추가
    formData.append(
      'dto',
      new Blob([JSON.stringify(boardPost)], { type: 'application/json' }),
    );
    files.forEach((file) => formData.append('files', file.file));

    // 파일이 선택되었을 경우에만 'files' 필드를 추가
    if (files && files.length > 0) {
      files.forEach((file) => {
        // console.log(
        //   `파일명: ${file.name}, 파일 크기: ${file.size} bytes, 파일 타입: ${file.type}`,
        // );
        formData.append('files', file); // 'files' 필드에 각각 파일을 추가
      });
    }

    try {
      let url;
      if (postId) {
        url = `${BASE_URL}/api/v1/posts/${postId}`;
      } else {
        url = `${BASE_URL}/api/v1/posts`;
      }

      const method = postId ? 'patch' : 'post';

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.code === 200) {
        alert(postId ? '게시글이 수정되었습니다.' : '게시글이 작성되었습니다.');
        setBoardData(response.data.data);
        navigate('/board');
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      if (
        err.finalResponse &&
        err.finalResponse.data &&
        err.finalResponse.data.message
      ) {
        // console.error(
        //   'Error message from server:',
        //   err.finalResponse.data.message,
        // );
      }
    }
  };

  const handleBoardClick = () => {
    if (boardPost.title && boardPost.content.length >= 1) {
      const confirmMessage = postId
        ? '게시물을 수정하시겠습니까?'
        : '게시글을 생성하시겠습니까?';
      const confirmSave = window.confirm(confirmMessage);
      if (confirmSave) {
        saveBoard();
      }
    }
  };

  const handleOpenMenu = () => {
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

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
          name="title"
          value={boardPost.title}
          onChange={onChange}
        />
      </StyledText>
      <StyledLine />
      <StyledText>
        <StyledContent
          placeholder="내용을 입력하세요."
          name="content"
          value={boardPost.content}
          onChange={onChange}
        />
      </StyledText>
      <img
        src={fileAttach}
        alt=""
        onClick={handleOpenMenu}
        style={{ marginLeft: '7%', marginBottom: '148px' }}
      />

      <FileAttachMenu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        onFilesChange={setFiles}
      />
    </StyledPosting>
  );
};

export default StudyPosting;
