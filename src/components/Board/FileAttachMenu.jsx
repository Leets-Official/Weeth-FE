import React from 'react';
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
  text-transform: none; // 텍스트 변환을 방지합니다.
  min-width: 0; // 버튼의 최소 너비를 제거합니다.
  padding: 0; // 버튼의 좌우 패딩을 조정하여 너비를 좁힙니다.
  margin-left: 0.5rem; // 버튼 간의 간격을 줄입니다.
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.color.grayScale.gray30};
  margin: 24px 0 8px 0; // 분리선 위쪽 여백을 늘리고 아래쪽 여백을 줄입니다.
`;

const FileAttachMenu = ({ isOpen, onClose }) => {
  const handleRightButtonClick = () => {
    onClose();
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
          bgcolor: '#3d3d3d', // 배경 색상을 #3d3d3d로 설정
          boxShadow: 24,
          p: 2,
        }}
      >
        <Grid container spacing={1} sx={{ mt: -1 }}>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 0, mb: 1 }}>
              <StyledTypography variant="subtitle1" sx={{ ml: 2 }}>사진</StyledTypography>
              <Box display="flex" alignItems="center" sx={{ mr: 0.5 }}>
                <StyledButton>전체</StyledButton>
                <StyledButton>
                  <RightButton onClick={handleRightButtonClick} alt="" />
                </StyledButton>
              </Box>
            </Box>
            <Grid container justifyContent="center" spacing={1}>
              {[...Array(3)].map((_, index) => (
                <Grid item key={index} sx={{ width: '30%' }}>
                  <Card>
                    <CardContent sx={{ height: 60 }}></CardContent>
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
                <StyledButton>전체</StyledButton>
                <StyledButton>
                  <RightButton onClick={handleRightButtonClick} alt=""/>
                </StyledButton>
              </Box>
            </Box>
            <Grid container justifyContent="center" spacing={1}>
              {[...Array(3)].map((_, index) => (
                <Grid item key={index} sx={{ width: '30%' }}>
                  <Card>
                    <CardContent sx={{ height: 60 }}></CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default FileAttachMenu;
