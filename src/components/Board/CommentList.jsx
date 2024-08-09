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

  console.log(typeof postId);

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`${BASE_URL}/api/v1/posts/${postId}`, { headers })
      .then((response) => {
        console.log('API Response:', response);
        if (response.data.code === 200) {
          setComments(response.data.data.comments || []);
        } else {
          console.error('API response error:', response.data.message);
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('API Request Error:', err);
        setError('An error occurred while fetching the data');
      });
  }, [accessToken, setError, postId]);

  const handleNavigate = (comment) => {
    navigate(`/board/${comment.id}`, {
      state: { data: comment },
    });
  };

  return (
    <div>
      {comments.map((comment) => (
        <BoardComment
          key={comment.id}
          name={comment.name}
          content={comment.content}
          time={comment.time || '시간 정보 없음'} // Use modifiedAt if available
          recomments={comment.children || []} // 대댓글은 children 속성으로 전달됨
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
