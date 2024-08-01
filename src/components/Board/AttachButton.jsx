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

const AttachButton = ({ onFileChange, fileUrl }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const link = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      link.href = url;
      link.download = fileUrl.split('/').pop(); // 파일 이름을 URL에서 추출
      link.click();
      window.URL.revokeObjectURL(url); // 메모리 해제를 위해 Object URL을 해제
    } catch (error) {
      console.error('파일 다운로드 실패:', error);
    }
  };

  return (
    <Container>
      <StyledButton onClick={handleButtonClick}>
        <div className="text">
          <FileName>첨부파일</FileName>
        </div>
        <InstallIcon
          className="icon"
          alt="install"
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
  onFileChange: PropTypes.func.isRequired,
  fileUrl: PropTypes.string.isRequired, // fileUrl은 필수 속성입니다.
};

export default AttachButton;
