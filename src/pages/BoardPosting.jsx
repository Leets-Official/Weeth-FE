import styled from 'styled-components';
import BoardHeader from '../components/Board/PostingHeader';
// import theme from '../styles/theme';

const StyledPosting = styled.div`
  width: 370px;
  height: 810px;
`;

// const StyledText = styled.div`
//   font: ${theme.font.familiy.pretendard_semiBold};
//   color: ${theme.grayScale.gray65};
//   font-size: 16px;
//   font-weight: 600;
//   line-height: 19.09px;
// `;

const BoardPosting = () => {
  return (
    <StyledPosting>
      <BoardHeader />
    </StyledPosting>
  );
};

export default BoardPosting;
