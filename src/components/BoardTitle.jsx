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

const BoardTitle = ({ text, writer, createdAt }) => {
  const splittedCreatedAt = createdAt.split('T'); // YYYY-MM-DD,HH:MM:SS.SSSZ
  const createdDate = splittedCreatedAt[0].replace(/-/g, '/'); // YYYY-MM-DD -> YYYY/MM/DD
  const createdTime = splittedCreatedAt[1].split(':', 2); // [HH, MM]

  return (
    <StyledTitle>
      <StyledHeader>
        <LeftButton />
        <IndexButton onClick={onClickIndexButton} />
      </StyledHeader>
      <Title>{text}</Title>
      <Detail>
        <Writer>{writer}</Writer>
        <WrittenTime>
          {createdDate} {createdTime[0]}:{createdTime[1]}
        </WrittenTime>
      </Detail>
    </StyledTitle>
  );
};

BoardTitle.propTypes = {
  text: PropTypes.string.isRequired,
  writer: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default BoardTitle;
