import PropTypes from 'prop-types';
import React, { useState } from 'react';
import api from '@/api/api';
import styled from 'styled-components';
import replaceNewLines from '@/hooks/newLine';
import registerComment from '../../assets/images/ic_send.svg';
import theme from '../../styles/theme';

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 370px;
  margin: 10px 5% 10px 5%;
`;

const InputField = styled.input`
  width: 100%;
  height: 37px;
  color: ${theme.color.gray[100]};
  background-color: ${theme.color.main};
  border: none;
  border-radius: 15px;
  font-size: 16px; // 확대 방지를 위해 16px로 설정
  font-family: ${theme.font.semiBold};
  outline: none;
  padding: 0 10% 0 5%;

  &::placeholder {
    color: ${theme.color.gray[100]};
  }
`;

const Typing = ({
  noticeId,
  postId,
  onCommentSubmitted,
  parentCommentId = null,
  onInputFocus,
}) => {
  const [comment, setComment] = useState('');
  // const location = useLocation();
  // const { parentCommentId = null } = location.state || {};

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRegisterComment = async () => {
    const trimmedComment = comment.trim();
    if (trimmedComment === '') {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    // Use replaceNewLines function from Utils to process the comment
    const processedComment = replaceNewLines(trimmedComment);

    try {
      let url;
      if (noticeId) {
        url = `/api/v1/notices/${noticeId}/comments`; // 공지사항 댓글 경로
      } else if (postId) {
        url = `/api/v1/posts/${postId}/comments`; // 일반 게시물 댓글 경로
      } else {
        // console.error('Neither postId nor noticeId is provided.');
        return;
      }

      const response = await api.post(url, {
        content: processedComment,
        parentCommentId,
      });

      if (response.data.code === 200) {
        setComment(''); // 입력 필드 초기화
        onCommentSubmitted(response.data.data); // 새로운 댓글 데이터를 부모 컴포넌트로 전달
      } else {
        // console.error('응답에서 오류 발생:', response.data.message);
      }
    } catch (error) {
      alert('댓글 작성 중 오류가 발생했습니다');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleRegisterComment();
    }
  };

  return (
    <InputWrapper>
      <InputField
        type="text"
        value={comment}
        placeholder="댓글을 입력하세요."
        onChange={handleCommentChange}
        onFocus={onInputFocus} // 입력창이 포커스될 때 대댓글 상태 초기화
        onKeyPress={handleKeyPress}
      />
      <img
        src={registerComment}
        alt=""
        onClick={handleRegisterComment}
        style={{
          position: 'absolute',
          right: '10px',
          top: '50%',
          transform: 'translateY(-50%)',
          cursor: 'pointer',
        }}
      />
    </InputWrapper>
  );
};

Typing.propTypes = {
  noticeId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  onCommentSubmitted: PropTypes.func.isRequired,
  parentCommentId: PropTypes.number,
  onInputFocus: PropTypes.func.isRequired,
};

Typing.defaultProps = {
  parentCommentId: null, // 기본값을 null로 설정
};

export default Typing;
