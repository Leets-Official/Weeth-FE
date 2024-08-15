import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NoticeHeader from '../components/Board/NoticeHeader';
import AttachButton from '../components/Board/AttachButton';
// import Typing from '../components/Board/Typing';
import CommentList from '../components/Board/CommentList';
import { ReactComponent as BoardChat } from '../assets/images/ic_board_chat.svg';
import theme from '../styles/theme';
import { BoardContext } from '../hooks/BoardContext';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 370px;
  max-width: 370px;
  min-height: 810px;
  color: ${theme.color.grayScale.white};
  margin-bottom: 50px;
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
  margin: 0 0 7%;
  padding: 0;
`;

const StudyNamed = styled.div`
  font-size: 24px;
`;

const SubRow = styled.div`
  display: flex;
  margin-top: 10px;
  font-family: ${theme.font.family.pretendard_regular};
  color: #c1c1c1;
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

const StudyContents = styled.div`
  width: 88%;
  margin-top: 20px;
  margin-right: 4%;
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 16px;
  line-height: 19.09px;
`;

const RightMargin = styled.div`
  margin-right: 27%;
`;

const CommentCountWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  padding-bottom: 10px;
`;

const CommentCount = styled.div`
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const CommentSection = styled.div`
  margin-top: 15px;
  padding-top: 10px;
  border-top: 1px solid ${theme.color.grayScale.gray30};
`;

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month}/${day} ${hours}:${minutes}`;
};

const StudyDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  // console.log('Post ID from useParams:', id);

  const postId = parseInt(id, 10);
  // console.log('Parsed postId:', postId);

  const { boardData, error, setError } = useContext(BoardContext);
  const [content, setContent] = useState(null);
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  const navigate = useNavigate();

  console.log('context 불러온 후:', error);
  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  // 게시글 삭제
  const handleDeleteClick = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const url = `${BASE_URL}/api/v1/posts/${postId}`;
        console.log('Sending DELETE request to:', url);
        console.log('Authorization header:', `Bearer ${accessToken}`);

        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        if (response.data.code === 200) {
          alert('삭제가 완료되었습니다.');
          navigate('/board');
        } else if (response.data.code === 400) {
          alert(`삭제 실패: ${response.data.message}`);
        } else {
          console.error('알 수 없는 오류 발생:', response.data.message);
          alert(`삭제에 실패했습니다. 오류 메시지: ${response.data.message}`);
        }
      } catch (err) {
        console.error('삭제 요청 중 오류 발생:', err);
        alert('삭제 도중 오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.data.code === 200) {
          setContent(response.data.data);
          setTotalCommentCount(response.data.data.commentCount || 0);
        } else {
          console.error('Error fetching post data:', response.data.message);
          setError(response.data.message);
        }
      } catch (err) {
        console.error('API request error:', err);
        setError('API request error');
      }
    };

    if (state?.data) {
      setContent(state.data);
      setTotalCommentCount(state.data.commentCount || 0);
    } else if (boardData) {
      const currentData = boardData.find((post) => post.id === postId);
      if (currentData) {
        setContent(currentData);
        setTotalCommentCount(currentData.commentCount || 0);
      } else {
        fetchData();
      }
    } else {
      fetchData();
    }
  }, [state, boardData, postId, accessToken, BASE_URL, setError]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.data.code === 200) {
        setContent(response.data.data);
        setTotalCommentCount(response.data.data.commentCount || 0);
      } else {
        console.error('Error fetching post data:', response.data.message);
        setError(response.data.message);
      }
    } catch (err) {
      console.error('API request error:', err);
      setError('API request error');
    }
  };

  // 댓글 작성
  const handleCommentSubmitted = async (newComment, parentCommentId = null) => {
    if (!newComment || !newComment.content) {
      console.error('댓글 데이터가 올바르지 않습니다:', newComment);
      return;
    }

    const trimmedContent = newComment.content.trim();

    if (!trimmedContent) {
      setError('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/posts/${postId}/comments`,
        {
          ...newComment,
          content: trimmedContent,
          parentCommentId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.data.code === 200) {
        console.log('댓글이 성공적으로 등록되었습니다.');
        // 댓글 등록 후 게시글의 최신 데이터를 다시 가져옵니다.
        fetchComments(); // 댓글 데이터를 다시 가져오는 함수 호출
      } else {
        console.error('Error posting comment:', response.data.message);
        setError(response.data.message);
      }
    } catch (err) {
      console.error('API request error:', err);
      setError('API request error');
    }
  };

  const handleEditClick = () => {
    navigate(`/boardPosting`, {
      state: { title: content.title, content: content.content, postId },
    });
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!content) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <HeaderWrapper>
        <NoticeHeader
          onMenuClick={(action) => {
            if (action === 'delete') {
              handleDeleteClick();
            } else if (action === 'edit') {
              handleEditClick();
            }
          }}
          showModal={false}
        />
      </HeaderWrapper>
      <StudyRow>
        <TextContainer>
          <StudyNamed>{content?.title || 'Loading...'}</StudyNamed>
          <SubRow>
            <UserName>{content?.name || 'Unknown'}</UserName>
            <StyledDate>
              {formatDateTime(content?.time) || '00/00 00:00'}
            </StyledDate>
          </SubRow>
          <StudyContents>{content?.content || 'Loading...'}</StudyContents>
        </TextContainer>
        <ComponentRow>
          {content.fileUrls ? (
            <AttachButton fileUrl={content.fileUrls[0]} />
          ) : null}
          <RightMargin />
        </ComponentRow>
        <CommentCountWrapper>
          <BoardChat alt="" />
          <CommentCount>{totalCommentCount}</CommentCount>
        </CommentCountWrapper>
        <CommentSection>
          <CommentList
            postId={postId}
            onCommentSubmitted={handleCommentSubmitted}
          />
        </CommentSection>
      </StudyRow>
    </Container>
  );
};

export default StudyDetail;
