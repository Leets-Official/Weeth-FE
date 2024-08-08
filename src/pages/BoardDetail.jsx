import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BoardHeader from '../components/Board/NoticeHeader';
import BoardComment from '../components/Board/BoardComment';
import AttachButton from '../components/Board/AttachButton';
import Typing from '../components/Board/Typing';
// import BoardAPI from '../hooks/BoardAPI'; // 이 줄을 주석처리하거나 정확한 경로로 수정
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

const CommentCount = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  line-height: 14.32px;
  margin-left: 4px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 15px;
  border-bottom: 1px solid ${theme.color.grayScale.gray30};
  padding-bottom: 10px;
`;

const formatDateTime = (dateTimeString) => {
  const date = new Date(dateTimeString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${month}/${day} ${hours}:${minutes}`;
};

const BoardDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  console.log('Post ID from useParams:', id);

  const postId = parseInt(id, 10);
  console.log('Parsed postId:', postId);

  const { boardData, error, setError } = useContext(BoardContext);
  const [content, setContent] = useState(null);
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
      } catch (error) {
        console.error('API request error:', error);
        setError('API request error');
      }
    };

    if (state?.data) {
      setContent(state.data);
      setTotalCommentCount(state.data.commentCount || 0);
    } else if (boardData) {
      const currentData = boardData.find(post => post.id === postId);
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

  const handleCommentSubmitted = async (newComment) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/posts/${postId}/comments`, 
        { content: newComment }, 
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.data.code === 200) {
        const updatedCount = response.data.data.commentCount;
        setTotalCommentCount(updatedCount);
        setContent(prevContent => ({
          ...prevContent,
          commentCount: updatedCount,
          comments: [...prevContent.comments, newComment],
        }));
      } else {
        console.error('Error posting comment:', response.data.message);
        setError(response.data.message);
      }
    } catch (error) {
      console.error('API request error:', error);
      setError('API request error');
    }
  };

  const handleEditClick = () => {
    navigate(`/boardPosting`, { state: { title: content.title, content: content.content, postId } });
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
        <BoardHeader onMenuClick={(action) => {
          if (action === 'delete') {
            handleDeleteClick();
          } else if (action === 'edit') {
            handleEditClick(); // 수정 버튼 클릭 시 호출
          }
        }} showModal={false} />
      </HeaderWrapper>
      <StudyRow>
        <TextContainer>
          <StudyNamed>{content?.title || 'Loading...'}</StudyNamed>
          <SubRow>
            <UserName>{content?.name || 'Unknown'}</UserName>
            <StyledDate>{formatDateTime(content?.time) || '00/00 00:00'}</StyledDate>
          </SubRow>
          <StudyContents>{content?.content || 'Loading...'}</StudyContents>
        </TextContainer>
        <ComponentRow>
          {content.fileUrls ? (
            <AttachButton
              fileUrl={content.fileUrls[0]} 
            />
          ) : null}
          <RightMargin />
        </ComponentRow>
        <BottomRow>
          <BoardChat alt="" />
          <CommentCount>{content?.commentCount || 0}</CommentCount>
        </BottomRow>
        {content.comments && content.comments.map(comment => (
          <BoardComment
            key={comment.id}
            name={comment.name || 'Unknown User'}
            content={comment.content}
            time={formatDateTime(comment.time)}
            recomments={comment.children || []}
          />
        ))}
      </StudyRow>
      <Typing
        postId={postId}
        onCommentSubmitted={handleCommentSubmitted}
        comment={content.comment || ''}
      />
      {/* <BoardAPI />  // 이 부분을 주석처리하거나 필요에 따라 사용하세요 */}
    </Container>
  );
};

export default BoardDetail;
