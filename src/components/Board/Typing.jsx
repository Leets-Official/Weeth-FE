import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RegisterComment } from '../../assets/images/ic_send.svg';
import theme from '../../styles/theme';
import Utils from '../../hooks/Utils';

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
  const [parentId, setParentId] = useState(null); // 대댓글 모드 상태 관리

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const navigate = useNavigate();

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleRegisterComment = async () => {
    if (comment.trim() === '') return;

    console.log('현재 comment의 값: ', comment);

    try {
      const payload = {
        parentCommentId: parentId || null, // 대댓글이 아닌 경우 null로 설정
        content: comment, // comment를 그대로 전송
      };

      console.log('서버로 보낼 payload: ', payload);

      const response = await axios.post(
        `${BASE_URL}/api/v1/posts/${postId}/comments`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('서버로부터의 응답:', response);

      // 만약 Utils 함수를 사용하고 싶다면 여기에 적용
      const validResponse = await Utils(
        response,
        axios.post,
        [
          `${BASE_URL}/api/v1/posts/${postId}/comments`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        ],
        navigate,
      );

      if (validResponse.data.code === 200) {
        console.log('댓글이 성공적으로 등록되었습니다.');
        setComment(''); // 입력 필드 초기화
        onCommentSubmitted(validResponse.data); // 새로운 댓글을 부모 컴포넌트로 전달
        setParentId(null); // parentId 초기화
      } else {
        console.error('응답에서 오류 발생:', validResponse.data.message);
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
        placeholder={parentId ? '대댓글을 입력하세요.' : '댓글을 입력하세요.'}
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
  postId: PropTypes.number.isRequired, // Post ID
  onCommentSubmitted: PropTypes.func.isRequired, // Notify parent component after comment submission
};

export default Typing;
