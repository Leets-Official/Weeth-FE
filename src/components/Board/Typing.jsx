import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { ReactComponent as RegisterComment } from '../../assets/images/ic_send.svg';
import theme from '../../styles/theme';

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

const Typing = ({ comment, handleCommentChange, handleRegisterComment }) => {
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
  comment: PropTypes.string.isRequired,
  handleCommentChange: PropTypes.func.isRequired,
  handleRegisterComment: PropTypes.func.isRequired,
};

export default Typing;
