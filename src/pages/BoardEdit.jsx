import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import BoardHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
// import { BoardContext } from '../hooks/BoardContext';
import theme from '../styles/theme';
import Utils from '../hooks/Utils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  min-height: 810px;
  color: ${theme.color.grayScale.white};
`;

const HeaderWrapper = styled.div`
  position: fixed;
  width: 370px;
  background-color: ${theme.color.grayScale.gray12};
  top: 0;
  z-index: 1;
`;

const StudyRow = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 6%;
  margin-top: 90px;
  flex-grow: 1;
`;

const TextContainer = styled.div`
  margin: 0 0 7%; 10px;
  padding: 0;
`;

const StudyNamed = styled.input`
  margin-left: 7%;
  font-size: 24px;
  font-weight: 600;
  background-color: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  border-bottom: 1px solid ${theme.color.grayScale.gray65};
  padding: 5px;
`;

const SubRow = styled.div`
  display: flex;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
  font-weight: 400;
  font-size: 12px;
  line-height: 14.32px;
`;

const ComponentRow = styled.div`
  display: flex;
  margin-top: 10px;
  margin: 40px 4% 0 0;
`;

const UserName = styled.div`
  padding: 0;
  margin-right: 3%;
`;

const StyledDate = styled.div`
  padding: 0;
`;

const StudyContents = styled.textarea`
  width: 88%;
  margin-top: 20px;
  margin-right: 4%;
  font-family: ${theme.font.family.pretendard_regular};
  weight: 400;
  font-size: 16px;
  line-height: 19.09px;
  background-color: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  border: 1px solid ${theme.color.grayScale.gray65};
  padding: 10px;
`;

const RightMargin = styled.div`
  margin-right: 27%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const SubmitButton = styled.button`
  background-color: ${theme.color.primary};
  color: ${theme.color.grayScale.white};
  font-size: 16px;
  font-weight: 600;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${theme.color.primaryDark};
  }
`;

const BoardEdit = () => {
  const [boardDetail, setBoardDetail] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const { id: postId } = useParams();
  const navigate = useNavigate();

  const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;
  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchBoardDetail = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { data } = response.data;
        setBoardDetail(data);
        setTitle(data.title);
        setContent(data.content);
      } catch (err) {
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    fetchBoardDetail();
  }, [postId, ACCESS_TOKEN]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleModifyClick = async () => {
    try {
      const url = `${BASE_URL}/${postId}`;
      const formData = new FormData();

      const requestPostDTO = {
        title,
        content,
      };
      formData.append(
        'requestPostDTO',
        new Blob([JSON.stringify(requestPostDTO)], {
          type: 'application/json',
        }),
      );

      const files = []; // 여기에 업로드할 파일들을 추가합니다.
      // 파일이 존재하는 경우에만 formData에 파일 추가
      if (files.length > 0) {
        files.forEach((file) => {
          formData.append('files', file);
        });
      }

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const validatedResponse = await Utils(response, axios.post, [
        url,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        },
        navigate,
      ]);

      if (validatedResponse.status === 200) {
        alert('수정이 완료되었습니다.');
        navigate(`/board/${postId}`);
      } else {
        alert('수정에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      alert('수정 도중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleFileChange = (file) => {
    console.log('File changed:', file);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!boardDetail) {
    return <div>Loading...</div>;
  }

  const { userName, createdAt, fileUrls } = boardDetail;

  return (
    <Container>
      <HeaderWrapper>
        <BoardHeader onMenuClick={() => {}} showModal={false} />
      </HeaderWrapper>
      <StudyRow>
        <TextContainer>
          <StudyNamed value={title} onChange={handleTitleChange} />
          <SubRow>
            <UserName>{userName}</UserName>
            <StyledDate>{new Date(createdAt).toLocaleString()}</StyledDate>
          </SubRow>
          <StudyContents value={content} onChange={handleContentChange} />
        </TextContainer>
        <ComponentRow>
          {fileUrls &&
            fileUrls.map((file) => (
              <AttachButton
                key={file.url}
                filetype={file.url.split('.').pop().toUpperCase()}
                onFileChange={handleFileChange}
              />
            ))}
          <RightMargin />
        </ComponentRow>
      </StudyRow>
      <ButtonContainer>
        <SubmitButton onClick={handleModifyClick}>수정 완료</SubmitButton>
      </ButtonContainer>
    </Container>
  );
};

export default BoardEdit;
