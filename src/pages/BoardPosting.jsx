import styled from 'styled-components';
import BoardHeader from '../components/Board/PostingHeader';
import theme from '../styles/theme';

const StyledPosting = styled.div`
  width: 370px;
`;

const StyledText = styled.div`
  font-family: ${theme.font.family.pretendard_semiBold};
  color: ${theme.color.grayScale.gray65};
  font-size: 16px;
  font-weight: 600;
  line-height: 19.09px;
`;

/* 임시 */
const StyledTitle = styled.input`
  width: 100%;
  margin-top: 20px;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.gray65};
  font-size: 16px;
  font-weight: 600;
  outline: none;
`;

const StyledLine = styled.div`
  width: 88%;
  height: 1px;
  margin: 20px 7%;
  background-color: ${theme.color.grayScale.gray30};
`;

const StyledContent = styled.textarea`
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${theme.color.grayScale.gray65};
  color: ${theme.color.grayScale.gray65};
  font-size: 16px;
  font-weight: 600;
  padding: 10px 0;
  outline: none;
  resize: none;
  height: 300px;
`;

const BoardPosting = () => {
  return (
    <StyledPosting>
      <BoardHeader />
      <StyledText>
        <StyledTitle type="text" placeholder="제목" />
        <StyledLine />
        <StyledContent placeholder="내용을 입력하세요." />
      </StyledText>
    </StyledPosting>
  );
};

export default BoardPosting;
