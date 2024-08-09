import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import BoardComment from './BoardComment';
import { BoardContext } from '../../hooks/BoardContext';

const CommentList = ({ postId }) => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { setError } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

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
  }, [accessToken, setError, postId]);

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

        if (response.status === 200) {
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
    }
  };

  const handleNavigate = (comment) => {
    navigate(`/board/${comment.id}`, {
      state: { data: comment },
    });
  };

  return (
    <div>
      {comments.map((comment) => (
        <BoardComment
          postId={postId}
          key={comment.id}
          commentId={comment.id}
          name={comment.name}
          content={comment.content}
          time={comment.time || '시간 정보 없음'} // Use modifiedAt if available
          recomments={comment.children || []} // 대댓글은 children 속성으로 전달됨
          onDelete={() => handleDeleteComment(comment.id)}
          onClick={() => handleNavigate(comment)}
        />
      ))}
    </div>
  );
};

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
};

export default CommentList;
