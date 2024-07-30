import React, { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../hooks/UserContext';
import PostingHeader from '../components/Board/PostingHeader';
import FileAttachMenu from '../components/Board/FileAttachMenu';
import { ReactComponent as FileAttach } from '../assets/images/ic_board_fileAttach.svg';
import theme from '../styles/theme';
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
  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
  const { userData } = useContext(UserContext);

  const [boardPost, setBoardPost] = useState({
    title: '',
    content: '',
  });
  const [files, setFiles] = useState([]);

  const { title, content } = boardPost;

  const onChange = (event) => {
    const { value, name } = event.target;
    setBoardPost({
      ...boardPost,
      [name]: value,
    });
  };

  const onFileChange = (event) => {
    setFiles(event.target.files);
  };

  const saveBoard = async () => {
    const formData = new FormData();
    formData.append(
      'requestPostDTO',
      new Blob([JSON.stringify(boardPost)], { type: 'application/json' }),
    );
    Array.from(files).forEach((file) => formData.append('files', file));

    try {
      const response = await axios.post(
        'http://13.125.78.31:8080/posts',
        formData,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            'Content-Type': 'multipart/form-data',
          },
          params: {
            userId: userData.id,
          },
        },
      );
      console.log('Server response:', response);
      const validatedResponse = await Utils(
        response,
        axios.post,
        [
          'http://13.125.78.31:8080/posts',
          formData,
          {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
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
        // 사용자가 입력한 데이터 출력
        console.log('Title:', title);
        console.log('Content:', content);
        console.log('Files:', files);
        navigate('/board');
      }
    } catch (error) {
      console.error('Error saving board post:', error);
    }
  };

  useEffect(() => {
    setIsCompleteEnabled(!!title && content.length >= 1);
  }, [title, content]);

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
          value={title}
          onChange={onChange}
        />
      </StyledText>
      <StyledLine />
      <StyledText>
        <StyledContent
          placeholder="내용을 입력하세요."
          name="content"
          value={content}
          onChange={onChange}
        />
      </StyledText>
      <input
        type="file"
        multiple
        onChange={onFileChange}
        style={{ marginLeft: '7%', marginBottom: '20px' }}
      />
      <FileAttach
        alt=""
        onClick={handleOpenMenu}
        style={{ marginLeft: '7%', marginBottom: '148px' }}
      />
      <FileAttachMenu isOpen={isMenuOpen} onClose={handleCloseMenu} />
    </StyledPosting>
  );
};

export default BoardPosting;
