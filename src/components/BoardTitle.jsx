import styled from 'styled-components';
import PropTypes from 'prop-types';
import LeftButton from './Header/LeftButton';
import IndexButton from './Header/IndexButton';
import theme from '../styles/theme';

const StyledTitle = styled.div`
  margin: 45px 25px 20px 25px; //기본 헤더 마진
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 24px;
  padding: 10px 0px;
`;

const Writer = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  color: #a6a6a6;
`;

const WrittenTime = styled.div`
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 12px;
  color: #a6a6a6;
`;

const Detail = styled.div`
  display: flex;

  div {
    margin-right: 10px;
  }
`;

const onClickIndexButton = () => {};

const BoardTitle = ({ text }) => {
  return (
    <StyledTitle>
      <StyledHeader>
        <LeftButton />
        <IndexButton onClick={onClickIndexButton} />
      </StyledHeader>
      <Title>{text}</Title>
      <Detail>
        <Writer>게시자</Writer>
        <WrittenTime>2024/06/10 18:32</WrittenTime>
      </Detail>
    </StyledTitle>
  );
};

BoardTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default BoardTitle;
