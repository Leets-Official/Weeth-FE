/* eslint-disable no-console */
/* eslint-disable no-alert */
import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '@/api/UserContext';
// import { BoardContext } from '@/api/BoardContext';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '../../styles/theme';
import BoardComment from './BoardComment';
import Typing from './Typing';

const TypingContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 370px; /* 헤더와 동일한 너비 */
  background-color: ${theme.color.gray[12]};
  display: flex;
  justify-content: center;
  padding: 0;
  z-index: 2;
  left: 50%;
  transform: translateX(-50%); /* 가로 방향으로 정확히 중앙에 배치 */
  font-size: 16px;
`;

const CommentList = ({ noticeId, postId }) => {
  const [comments, setComments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null);
  const { boardData, setBoardData } = useContext(BoardContext);
  const { userData } = useContext(UserContext);

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = import.meta.env.VITE_API_URL;

  // API 호출 함수
  const fetchComments = async () => {
    try {
      let url;
      if (postId) {
        url = `${BASE_URL}/api/v1/posts/${postId}`;
      } else if (noticeId) {
        url = `${BASE_URL}/api/v1/notices/${noticeId}`;
      } else {
        return;
      }
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.status === 200 && response.data.code === 200) {
        setBoardData(response.data.data);
        setComments(response.data.data.comments || []);
      } else {
        // console.log(response.data.message);
      }
    } catch (error) {
      // console.error('API Request Error:', error); // 요청 에러 로그 출력
    }
  };

  useEffect(() => {
    fetchComments(); // 컴포넌트가 처음 마운트될 때 최신 데이터를 가져옴
  }, [accessToken, noticeId, postId]);

  const handleReply = (parentCommentId, isDeleted) => {
    if (isDeleted) {
      alert('삭제된 댓글에는 대댓글을 달 수 없습니다.');
      return;
    }
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
    setReplyingTo(null); // 대댓글이 달린 후에 대댓글 상태 초기화
    fetchComments();
  };

  const handleDeleteComment = async (commentId, commentAuthor) => {
    if (userData.name !== commentAuthor) {
      alert('댓글 삭제는 본인만 가능합니다.');
      return;
    }

    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      try {
        let url;
        if (postId) {
          url = `${BASE_URL}/api/v1/posts/${postId}/comments/${commentId}`;
        } else if (noticeId) {
          url = `${BASE_URL}/api/v1/notices/${noticeId}/comments/${commentId}`;
        } else {
          // console.error('Neither postId nor noticeId is provided.');
          return;
        }

        const response = await axios.delete(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.status === 200 && response.data.code === 200) {
          alert('댓글이 삭제되었습니다.');

          await fetchComments();
        } else {
          alert('댓글 삭제 중 오류가 발생했습니다.');
        }
      } catch (error) {
        if (error.response) {
          alert('댓글 삭제 중 오류가 발생했습니다.');
        } else {
          alert('댓글 삭제 중 오류가 발생했습니다.');
        }
      }
      boardData.comments = boardData.comments.filter(
        (comment) => comment.id !== commentId,
      );
    }
  };

  // 키보드 입력하다가 스크롤할 때 입력창 사라지는 문제
  useEffect(() => {
    // Focus 시 TypingContainer로 스크롤
    const handleFocus = () => {
      const typingContainer = document.getElementById('typingContainer');
      if (typingContainer) {
        typingContainer.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const inputElements = document.querySelectorAll('input, textarea');
    inputElements.forEach((input) =>
      input.addEventListener('focus', handleFocus),
    );

    return () => {
      inputElements.forEach((input) =>
        input.removeEventListener('focus', handleFocus),
      );
    };
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {comments.map((comment, index) => {
        if (!comment.id) {
          return null;
        }

        const isWriter = comment.name === userData.name;

        // 서버로부터 받아온 comment.content가 '삭제된 댓글입니다.'면 작성자 이름을 '알 수 없음'으로 변경
        const displayName =
          comment.content === '삭제된 댓글입니다.'
            ? '알 수 없음'
            : comment.name;

        return (
          <BoardComment
            postId={postId}
            noticeId={noticeId}
            key={comment.id || index} // 여기에 고유한 key를 추가
            commentId={comment.id}
            name={displayName || 'Unknown User'}
            content={comment.content || ''}
            time={comment.time || '시간 정보 없음'}
            recomments={comment.children || []}
            onDelete={() => handleDeleteComment(comment.id, comment.name)}
            onReply={() => handleReply(comment.id, comment.deleted)}
            isDeleted={comment.deleted}
            setComments={setComments}
            isWriter={isWriter}
          />
        );
      })}
      <TypingContainer>
        <Typing
          noticeId={noticeId}
          postId={postId}
          onCommentSubmitted={handleCommentSubmitted}
          parentCommentId={replyingTo}
          onInputFocus={() => {
            if (!replyingTo) {
              setReplyingTo(null); // 댓글 상태 초기화
            }
          }} // 입력창이 포커스될 때, 대댓글 상태 초기화
          comment=""
        />
      </TypingContainer>
    </div>
  );
};

CommentList.propTypes = {
  noticeId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
};

export default CommentList;
