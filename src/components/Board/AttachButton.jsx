import React, { useRef } from 'react';
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

const AttachButton = ({ filetype, onFileChange, fileUrl, fileName }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName || 'download'; // 파일 이름이 없으면 'download'로 다운로드됩니다.
    link.click();
  };

  const truncateFileName = (name) => {
    if (name.length > 4) {
      return `${name.substring(0, 4)}...`;
    }
    return name;
  };

  return (
    <Container>
      <StyledButton onClick={handleButtonClick}>
        <div className="text">
          <FileName>{truncateFileName(fileName)}</FileName>
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
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: 'none' }}
      />
    </Container>
  );
};

AttachButton.propTypes = {
  filetype: PropTypes.node.isRequired,
  onFileChange: PropTypes.func.isRequired,
  fileUrl: PropTypes.string.isRequired, // fileUrl은 필수 속성입니다.
  // eslint-disable-next-line react/require-default-props
  fileName: PropTypes.string, // 선택적으로 파일 이름을 받습니다.
};

export default AttachButton;
