import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../styles/theme';

const NoticeMiddleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const NoticeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4% 15px 10px 6%;
`;

const NoticeTitle = styled.div`
  width: 74%;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-weight: 600;
  font-size: 16px;
  line-height: 19.09px;
`;

/* 여기서부터 */
const NoticeIntroduce = styled.div`
  color: ${theme.color.grayScale.gray65};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  font-size: 12px;
  margin-top: 10px;
`;

const NoticeMiddle = ({ title }) => {
  return (
    <NoticeMiddleContainer>
      <NoticeTextContainer>
        <NoticeTitle>{title}</NoticeTitle>
        <NoticeIntroduce>
          자세한 내용을 보려면 게시물을 클릭하세요...
        </NoticeIntroduce>
      </NoticeTextContainer>
    </NoticeMiddleContainer>
  );
};

NoticeMiddle.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NoticeMiddle;
