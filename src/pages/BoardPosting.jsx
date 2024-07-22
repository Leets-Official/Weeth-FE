import styled from 'styled-components';
import BoardHeader from '../components/Board/PostingHeader';
import { ReactComponent as FileAttach } from '../assets/images/ic_board_fileAttach.svg';
import theme from '../styles/theme';

const StyledPosting = styled.div`
  width: 370px;
`;
const StyledText = styled.div`
  margin-left: 7%;
  color: ${theme.color.grayScale.white};
  font-size: 16px;
  line-height: 19.09px;
`;

/* 임시 */
const StyledTitle = styled.input`
  width: 88%;
  margin-top: 20px;
  margin-bottom: 20px;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-weight: 600;
  outline: none;
`;

const StyledLine = styled.div`
  width: 88%;
  height: 1px;
  margin: 0 7%;
  background-color: ${theme.color.grayScale.gray30};
`;

const StyledContent = styled.textarea`
  width: 88%;
  margin-top: 12px;
  background: transparent;
  border: none;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_regular};
  font-weight: 400;
  padding: 10px 0;
  outline: none;
  resize: none;
  height: 455px;
`;

const BoardPosting = () => {
  return (
    <StyledPosting>
      <BoardHeader />
      <StyledText>
        <StyledTitle type="text" placeholder="제목" />
      </StyledText>
      <StyledLine />
      <StyledText>
        <StyledContent placeholder="내용을 입력하세요." />
      </StyledText>
      <FileAttach />
    </StyledPosting>
  );
};

export default BoardPosting;
