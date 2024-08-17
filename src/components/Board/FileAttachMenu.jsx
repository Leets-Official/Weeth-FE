import React, { useState } from 'react';
import { Box, Grid, Card, Typography, Button, Modal } from '@mui/material';
import styled from 'styled-components';
import theme from '../../styles/theme';

// 기본 버튼 스타일
const StyledButton = styled(Button)`
  color: white !important;
  text-transform: none;
  min-width: 0;
  padding: 0;
  margin-left: 0.5rem;
`;

// 모달 제목 및 버튼 스타일
const StyledTypography = styled(Typography)`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 16px;
  color: white;
`;

// 이미지 컨테이너와 이미지 스타일
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%; /* Aspect ratio 1:1 유지 */
  overflow: hidden;
  border-radius: 8px;
`;

const StyledImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// 삭제 버튼 스타일
const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  background: none;
  border: none;
  color: #ff5858;
  cursor: pointer;
  padding: 0;
  min-width: 24px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 3px; /* 두께를 더 두껍게 설정 */
    height: 16px;
    background-color: #ff5858;
    border-radius: 1px;
  }

  &::before {
    transform: rotate(45deg);
  }

  &::after {
    transform: rotate(-45deg);
  }
`;

// 파일 첨부 메뉴 컴포넌트
const FileAttachMenu = ({ isOpen, onClose, onFilesChange = () => {} }) => {
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      file: file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));

    setAttachments((prevAttachments) => [...prevAttachments, ...newFiles]);
  };

  const handleRightButtonClick = () => {
    onFilesChange(attachments);
    onClose();
  };

  const handleRemoveFile = (index) => {
    setAttachments((prevAttachments) =>
      prevAttachments.filter((_, i) => i !== index)
    );
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput-attachment').click();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          maxWidth: '400px',
          bgcolor: '#3d3d3d',
          boxShadow: 24,
          p: 2,
        }}
      >
        <Grid container spacing={1} sx={{ mt: -1 }}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 0, mb: 1 }}>
              <StyledTypography variant="subtitle1" sx={{ ml: 2 }}>첨부파일</StyledTypography>
              <Box display="flex" alignItems="center" sx={{ mr: 0.5 }}>
                <StyledButton onClick={triggerFileInput}>첨부</StyledButton>
                <StyledButton onClick={handleRightButtonClick}>완료</StyledButton>
              </Box>
            </Box>
            <Grid container justifyContent="center" spacing={1}>
              {attachments.map((file, index) => (
                <Grid item key={index} sx={{ width: '30%' }}>
                  <Card sx={{ boxShadow: 'none', padding: 0 }}>
                    <ImageContainer>
                      <StyledImage src={file.url} alt={file.name} />
                      <RemoveButton onClick={() => handleRemoveFile(index)} />
                    </ImageContainer>
                    <Typography variant="body2" sx={{ mt: 1 }}>{file.name}</Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <input
          type="file"
          id="fileInput-attachment"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Box>
    </Modal>
  );
};

export default FileAttachMenu;
