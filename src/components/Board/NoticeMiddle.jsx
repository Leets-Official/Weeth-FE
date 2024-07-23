import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import theme from '../../styles/theme';

const NoticeMiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0 7%;
  margin-bottom: 20px;
`;

const NoticeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(100% - 72px);
`;

const NoticeTitle = styled.div`
  margin-top: 20px;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.Pretendard_SemiBold};
  font-weight: 600;
  font-size: 16px;
  line-height: 19.09px;
`;

const NoticeIntroduce = styled.div`
  width: 100%;
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.Pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  margin-top: 10px;
`;

const StyledButton = styled.div`
  margin-top: 20px;
  margin-left: -50px;
`;

const NoticeMiddle = ({ title, button }) => {
  const navi = useNavigate();

  const handleButtonClick = () => {
    navi('/boardPosting');
  };

  return (
    <NoticeMiddleContainer>
      <NoticeTextContainer>
        <NoticeTitle>{title}</NoticeTitle>
        <NoticeIntroduce>
          자세한 내용을 보려면 게시물을 클릭하세요.
        </NoticeIntroduce>
      </NoticeTextContainer>
      <StyledButton onClick={handleButtonClick}>{button}</StyledButton>
    </NoticeMiddleContainer>
  );
};

NoticeMiddle.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.element,
};

NoticeMiddle.defaultProps = {
  button: null,
};

export default NoticeMiddle;
