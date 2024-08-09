import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { ReactComponent as RegisterComment } from '../../assets/images/ic_send.svg';
import theme from '../../styles/theme';

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 81%;
  margin: 10px 0 0 10%;
`;

const InputField = styled.input`
  width: 100%;
  height: 37px;
  color: ${theme.color.grayScale.white};
  background-color: ${theme.color.main.mainColor};
  border: none;
  border-radius: 15px;
  font-size: 14px;
  font-family: ${theme.font.family.pretendard_semiBold};
  outline: none;
  padding: 0 48% 0 5%;

  &::placeholder {
    color: ${theme.color.grayScale.white};
  }
`;

const Typing = ({ postId, onCommentSubmitted }) => {
  const [comment, setComment] = useState('');

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRegisterComment = async () => {
    const trimmedComment = comment.trim();
    if (trimmedComment === '') {
      console.error('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/posts/${postId}/comments`,
        { content: trimmedComment },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.code === 200) {
        console.log('댓글이 성공적으로 등록되었습니다.');
        setComment(''); // 입력 필드 초기화
        console.log('onCommentSubmitted 호출 전:', response.data.data);
        onCommentSubmitted(response.data.data); // 새로운 댓글 데이터를 부모 컴포넌트로 전달
      } else {
        console.error('응답에서 오류 발생:', response.data.message);
      }
    } catch (error) {
      console.error('댓글을 게시하는 데 실패했습니다:', error);
    }
  };

  return (
    <InputWrapper>
      <InputField
        type="text"
        value={comment}
        placeholder="댓글을 입력하세요."
        onChange={handleCommentChange}
      />
      <RegisterComment
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
  postId: PropTypes.number.isRequired,
  onCommentSubmitted: PropTypes.func.isRequired,
};

export default Typing;
