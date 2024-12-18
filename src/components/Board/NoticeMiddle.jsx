import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../../styles/theme';

const NoticeMiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: auto;
  padding: 0 7%;
  margin-bottom: 20px;
  font-family: ${theme.font.regular};
`;

const NoticeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: calc(100% - 72px);
`;

const NoticeTitle = styled.div`
  margin-top: 20px;
  color: ${theme.color.gray[100]};
  font-family: ${theme.font.semiBold};
  font-size: 16px;
  line-height: 19.09px;
`;

const NoticeIntroduce = styled.div`
  width: 100%;
  color: ${theme.color.gray[65]};
  font-family: ${theme.font.regular};
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
    if (title === '공지사항') {
      navi('/notice/post');
    } else if (title === '스터디 게시판') {
      navi('/study/post');
    }
  };

  return (
    <NoticeMiddleContainer>
      <NoticeTextContainer>
        <NoticeTitle>{title}</NoticeTitle>
        <NoticeIntroduce>
          자세한 내용을 보려면 게시물을 클릭하세요.
        </NoticeIntroduce>
      </NoticeTextContainer>
      {button && (
        <StyledButton onClick={handleButtonClick}>{button}</StyledButton>
      )}
    </NoticeMiddleContainer>
  );
};

NoticeMiddle.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.element.isRequired,
};

export default NoticeMiddle;
