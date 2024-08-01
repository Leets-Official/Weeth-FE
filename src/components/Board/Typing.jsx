import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as RegisterComment } from '../../assets/images/ic_send.svg';
import theme from '../../styles/theme';
import Utils from '../../hooks/Utils';

const InputWrapper = styled.div`
  position: relative; // fixed position을 사용하여 화면 하단에 고정
  bottom: ${({ paddingBottom }) => paddingBottom}px;
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
  font-weight: 600;
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

    try {
      const response = await axios.post(
        `${BASE_URL}/posts/${postId}/comments`,
        {
          parentId: parentId || 0, // body에 포함될 데이터
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // 헤더 설정은 여기서
          },
        },
      );

      const isValidResponse = await Utils(
        response,
        axios.post,
        [
          `${BASE_URL}/posts/${postId}/comments`,
          {
            parentId: parentId || 0, // body에 포함될 데이터
            content: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 헤더 설정은 여기서
            },
          },
        ],
        navigate,
      );

      if (isValidResponse.data.code === 200) {
        console.log('bbb', isValidResponse);
        setComment(''); // 입력 필드 초기화
        onCommentSubmitted(isValidResponse.data); // 새로운 댓글을 부모 컴포넌트로 전달
        setParentId(null); // parentId를 초기화하여 다시 일반 댓글 작성 모드로 변경
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
  postId: PropTypes.number.isRequired, // 포스트 ID
  onCommentSubmitted: PropTypes.func.isRequired, // 댓글 제출 후 부모 컴포넌트에 알림
};

export default Typing;
