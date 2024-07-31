import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BoardComment from './BoardComment';
import { BoardContext } from '../../hooks/BoardContext';

const CommentList = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const { boardData, setError } = useContext(BoardContext);

  const accessToken = localStorage.getItem('accessToken');
  // const refreshToken = localStorage.getItem('refreshToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(`${BASE_URL}/posts`, { headers })
      .then((response) => {
        if (response.data.code === 200) {
          setComments(boardData);
        } else {
          console.error('API response error:', response.data.message);
          setError(response.data.message);
        }
      })
      .catch((err) => {
        console.error('API Request Error:', err);
        setError('An error occurred while fetching the data');
      });
  }, [accessToken, setError]);

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
          name={comment.userName}
          content={comment.content}
          time={comment.modifiedAt || comment.createdAt} // 수정된 시간이 있으면 수정된 시간, 없으면 생성 시간
          totalComments=""
          onClick={() => handleNavigate(comment)}
        />
      ))}
    </div>
  );
};

export default CommentList;
