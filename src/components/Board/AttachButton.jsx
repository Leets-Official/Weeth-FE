import styled from 'styled-components';
import PropTypes from 'prop-types';
import theme from '../../styles/theme';
import { ReactComponent as InstallIcon } from '../../assets/images/ic_install.svg'; // 경로 나중에 수정

const Container = styled.div`
  width: 370px;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 98px;
  height: 56px;
  margin-top: 40px;
  margin-right: 0;
  background-color: #0e9871;
  border-radius: 5px;
  color: ${theme.color.grayScale.white};
  font-family: ${theme.font.family.pretendard_regular};
  font-size: 14px;
  cursor: pointer;
  border: none;
  padding: 0;

  .text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 10px;
  }

  .icon {
    margin: 30px 10px 0 0;
  }
`;

const FileName = styled.div`
  margin-bottom: 5px;
`;

const FileType = styled.span`
  color: ${theme.color.grayScale.white};
`;

const AttachButton = ({ filetype }) => {
  return (
    <Container>
      <StyledButton>
        <div className="text">
          <FileName>파일이름</FileName>
          <FileType>{filetype}</FileType>
        </div>
        <InstallIcon
          className="icon"
          alt="{install}"
          style={{
            marginBottom: '5px',
          }}
        />
      </StyledButton>
    </Container>
  );
};

AttachButton.propTypes = {
  filetype: PropTypes.node.isRequired,
};

export default AttachButton;
