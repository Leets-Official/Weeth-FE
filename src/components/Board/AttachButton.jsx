import React, { useRef } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import theme from '../../styles/theme';
import { ReactComponent as InstallIcon } from '../../assets/images/ic_install.svg'; // 경로 나중에 수정
import Utils from '../../hooks/Utils';

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

const AttachButton = ({ filetype, onFileChange }) => {
  const fileInputRef = useRef(null);
  const { postId } = useParams();

  const accessToken = localStorage.getItem('accessToken');
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleButtonClick = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const isValidResponse = await Utils(
        response,
        axios.get,
        [
          `${BASE_URL}/posts/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 헤더 설정은 여기서
            },
          },
        ],
        navigate,
      );

      console.log('Server response:', isValidResponse.data); // 서버 응답 출력

      if (isValidResponse.data && isValidResponse.data.code === 200) {
        const fileUrls = isValidResponse.data.data?.fileUrls;

        if (fileUrls && Array.isArray(fileUrls)) {
          // 여러 파일 URL을 처리
          const files = fileUrls.map(file => ({
            id: file.id,
            url: file.url,
            filetype: file.type || 'Unknown', // file.type이 없다면 기본값 'Unknown' 사용
          }));

          setFiles(files); // 파일 리스트 상태 업데이트
          onFileChange(files); // 파일 리스트를 부모 컴포넌트로 전달
        } else {
          console.error('No fileUrls array in response:', response.data);
        }
      } else {
        console.error('File download failed or unexpected response:', response.data?.message);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <Container>
      <StyledButton onClick={handleButtonClick}>
        <div className="text">
          <FileName>파일 이름</FileName>
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
  onFileChange: PropTypes.func.isRequired,
};

export default AttachButton;
