import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import { ReactComponent as InstallIcon } from '../../assets/images/ic_board_chat.svg'; // 경로 나중에 수정

const Container = styled.div`
  width: 370px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 98px;
  height: 56px;
  background-color: #0e9871;
  border-radius: 5px;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;

  &:hover {
    background-color: darken(#0e9871, 10%);
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
  }

  .icon {
    margin-right: 10px;
  }
`;

const FileName = styled.div`
  margin-bottom: 5px;
`;

const FileType = styled.span`
  color: ${theme.color.grayScale.gray};
`;

const AttachButton = ({ filetype }) => {
  return (
    <Container>
      <StyledButton>
        <div className="text">
          <FileName>파일이름</FileName>
          <FileType>{filetype}</FileType>
        </div>
        <InstallIcon className="icon" />
      </StyledButton>
    </Container>
  );
};

AttachButton.propTypes = {
  filetype: PropTypes.node.isRequired,
};

export default AttachButton;
