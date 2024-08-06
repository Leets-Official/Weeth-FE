import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';
import PostingHeader from '../components/Board/PostingHeader';
import FileAttachMenu from '../components/Board/FileAttachMenu';
import { ReactComponent as FileAttach } from '../assets/images/ic_board_fileAttach.svg';
import theme from '../styles/theme';
import { BoardContext } from '../hooks/BoardContext';
import Utils from '../hooks/Utils';

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

const BoardPosting = () => {
  const navigate = useNavigate();
  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const { userData } = useContext(UserContext);
  const { boardData } = useContext(BoardContext);
  const [files, setFiles] = useState([]);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const initialBoardPost = {
    title: boardData?.title || '',
    content: boardData?.content || '',
  };

  const [boardPost, setBoardPost] = useState(initialBoardPost);

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoardPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const saveBoard = async () => {
    if (!userData || !userData.id) {
      console.error('Error: User data is missing or invalid.');
      navigate('/login'); // 로그인 페이지로 리다이렉트
      return;
    }

    const formData = new FormData();
    formData.append(
      'dto',
      new Blob([JSON.stringify(boardPost)], { type: 'application/json' }),
    );
    Array.from(files).forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post(`${BASE_URL}/api/v1/posts`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        params: {
          userId: userData.id,
        },
      });
      console.log('Server response:', response);
      const validatedResponse = await Utils(
        response,
        axios.post,
        [
          `${BASE_URL}/api/v1/posts`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
            params: {
              userId: userData.id,
            },
          },
        ],
        navigate,
      );

      if (validatedResponse.status === 200) {
        console.log('Post successfully created:', validatedResponse.data);
        navigate('/board');
      }
    } catch (err) {
      console.error('Error saving board post:', err);
      if (err.response && err.response.data && err.response.data.message) {
        console.error('Error message from server:', err.response.data.message);
      }
    }
  };

  useEffect(() => {
    setIsCompleteEnabled(!!boardPost.title && boardPost.content.length >= 1);
  }, [boardPost.title, boardPost.content]);

  const handleBoardClick = () => {
    if (isCompleteEnabled) {
      saveBoard();
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
      <FileAttach
        alt=""
        onClick={handleOpenMenu}
        style={{ marginLeft: '7%', marginBottom: '148px' }}
      />
      <FileAttachMenu
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        setFiles={setFiles}
      />
    </StyledPosting>
  );
};

export default BoardPosting;
