import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import { ReactComponent as InstallIcon } from '../../assets/images/ic_install.svg'; // 경로 나중에 수정

const Container = styled.div`
  width: 370px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
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
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  border: none;
  padding: 0;

  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
  }

  .icon {
    margin-top: 30px;
    margin-right: 10px;
  }
`;

const FileName = styled.div`
  margin-bottom: 5px; /* 파일이름 밑 간격 */
`;

const FileType = styled.span`
  color: ${theme.color.grayScale.white};
`;

const IconMargin = styled.div`
  margin-bottom: 5px; /* 아이콘 밑 간격을 파일이름 밑 간격과 동일하게 설정 */
`;

const AttachButton = ({ filetype }) => {
  return (
    <Container>
      <StyledButton>
        <div className="text">
          <FileName>파일이름</FileName>
          <FileType>{filetype}</FileType>
        </div>
        <IconMargin>
          <InstallIcon className="icon" />
        </IconMargin>
      </StyledButton>
    </Container>
  );
};

AttachButton.propTypes = {
  filetype: PropTypes.node.isRequired,
};

export default AttachButton;
