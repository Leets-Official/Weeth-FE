import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import BoardComment from './BoardComment';
import Typing from './Typing';
import { BoardContext } from '../../hooks/BoardContext';

const CommentList = ({ postId }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const { boardData, setBoardData, setError } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  /*
  useEffect(() => {
    const fetchComments = async () => {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        const response = await axios.get(`${BASE_URL}/api/v1/posts/${postId}`, {
          headers,
        });
        console.log('API Response:', response);
        if (response.data.code === 200) {
          setComments(response.data.data.comments || []);
        } else {
          console.error('API response error:', response.data.message);
          setError(response.data.message);
        }
      } catch (err) {
        console.error('API Request Error:', err);
        setError('An error occurred while fetching the data');
      }
    };

    fetchComments(); // 마운트 시 fetchComments 호출
  }, [accessToken, setError, postId]); */

  // API 호출 함수
  const fetchComments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/v1/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200 && response.data.code === 200) {
        setBoardData(response.data.data);
        setComments(response.data.data.comments || []);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred while fetching the data');
      console.error('API Request Error:', error); // 요청 에러 로그 출력
    }
  };

  useEffect(() => {
    fetchComments(); // 컴포넌트가 처음 마운트될 때 최신 데이터를 가져옴
  }, [accessToken, postId]);

  const handleReply = (parentCommentId) => {
    setReplyingTo(parentCommentId);
  };

  const handleCommentSubmitted = (newComment) => {
    if (newComment.parentCommentId) {
      // 대댓글인 경우
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === newComment.parentCommentId
            ? {
                ...comment,
                children: [...(comment.children || []), newComment],
              }
            : comment,
        ),
      );
    } else {
      // 일반 댓글인 경우
      setComments((prevComments) => [...prevComments, newComment]);
    }
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('정말 이 댓글을 삭제하시겠습니까?')) {
      try {
        const response = await axios.delete(
          `${BASE_URL}/api/v1/posts/${postId}/comments/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );
        console.log(`DELETE request response:`, response);

        if (response.status === 200 && response.data.code === 200) {
          alert('댓글이 삭제되었습니다.');
          // 상태를 업데이트하여 최신 댓글 목록 반영
          setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId),
          );
        } else {
          console.error('서버 응답 오류:', response.data.message);
          alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
        }
      } catch (error) {
        if (error.response) {
          console.error('서버 오류:', error.response.data);
          alert(`댓글 삭제에 실패했습니다: ${error.response.data.message}`);
        } else {
          console.error('요청 오류:', error.message);
          alert('댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.');
        }
      }
      boardData.comments = boardData.comments.filter(
        (comment) => comment.id !== commentId,
      );
    }
  };

  const handleNavigate = (comment) => {
    navigate(`/board/${comment.id}`, {
      state: { data: comment },
    });
  };

  return (
    <div>
      {comments.map((comment, index) => {
        if (!comment.id) {
          console.error('Comment has no ID:', comment);
          return null; // or some fallback rendering
        }
        return (
          <BoardComment
            postId={postId}
            key={comment.id || index} // 여기에 고유한 key를 추가
            commentId={comment.id}
            name={comment.name || 'Unknown User'}
            content={comment.content || ''}
            time={comment.time || '시간 정보 없음'}
            recomments={comment.children || []}
            onDelete={() => handleDeleteComment(comment.id)}
            onReply={() => handleReply(comment.id)}
            onClick={() => handleNavigate(comment)}
          />
        );
      })}
      <Typing
        postId={postId}
        onCommentSubmitted={handleCommentSubmitted}
        parentCommentId={replyingTo}
        comment=""
      />
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentList;
