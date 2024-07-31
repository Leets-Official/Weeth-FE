import React, { useState } from 'react';
import { Box, Grid, Card, CardContent, Typography, Button, Modal } from '@mui/material';
import styled from 'styled-components';
import RightButton from '../Header/RightButton';
import theme from '../../styles/theme';

const StyledTypography = styled(Typography)`
  font-family: ${theme.font.family.pretendard_semiBold};
  font-size: 16px;
  color: white;
`;

const StyledButton = styled(Button)`
  color: white !important;
  text-transform: none;
  min-width: 0;
  padding: 0;
  margin-left: 0.5rem;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.grayScale.gray30};
  margin: 24px 0 8px 0;
`;

const FileAttachMenu = ({ isOpen, onClose, setFiles }) => {
  const [photos, setPhotos] = useState([]);
  const [attachments, setAttachments] = useState([]);

  const handleRightButtonClick = () => {
    onClose();
  };

  const handleFileChange = (event, type) => {
    const files = Array.from(event.target.files);
    setFiles((prevFiles) => [...prevFiles, ...files]);
    if (type === 'photo') {
      setPhotos((prevPhotos) => [...prevPhotos, ...files]);
    } else if (type === 'attachment') {
      setAttachments((prevAttachments) => [...prevAttachments, ...files]);
    }
  };

  const triggerFileInput = (type) => {
    document.getElementById(`fileInput-${type}`).click();
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
          width: 400,
          bgcolor: '#3d3d3d',
          boxShadow: 24,
          p: 2,
        }}
      >
        <Grid container spacing={1} sx={{ mt: -1 }}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 0, mb: 1 }}>
              <StyledTypography variant="subtitle1" sx={{ ml: 2 }}>사진</StyledTypography>
              <Box display="flex" alignItems="center" sx={{ mr: 0.5 }}>
                <StyledButton onClick={() => triggerFileInput('photo')}>전체</StyledButton>
                <StyledButton>
                  <RightButton onClick={handleRightButtonClick} alt="" />
                </StyledButton>
              </Box>
            </Box>
            <Grid container justifyContent="center" spacing={1}>
              {photos.map((file, index) => (
                <Grid item key={index} sx={{ width: '30%' }}>
                  <Card>
                    <CardContent sx={{ height: 60 }}>
                      <Typography variant="body2">{file.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Divider />
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 0, mb: 1 }}>
              <StyledTypography variant="subtitle1" sx={{ ml: 2 }}>첨부파일</StyledTypography>
              <Box display="flex" alignItems="center" sx={{ mr: 0.5 }}>
                <StyledButton onClick={() => triggerFileInput('attachment')}>전체</StyledButton>
                <StyledButton>
                  <RightButton onClick={handleRightButtonClick} alt="" />
                </StyledButton>
              </Box>
            </Box>
            <Grid container justifyContent="center" spacing={1}>
              {attachments.map((file, index) => (
                <Grid item key={index} sx={{ width: '30%' }}>
                  <Card>
                    <CardContent sx={{ height: 60 }}>
                      <Typography variant="body2">{file.name}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <input
          type="file"
          id="fileInput-photo"
          multiple
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, 'photo')}
        />
        <input
          type="file"
          id="fileInput-attachment"
          multiple
          style={{ display: 'none' }}
          onChange={(event) => handleFileChange(event, 'attachment')}
        />
      </Box>
    </Modal>
  );
};

export default FileAttachMenu;
