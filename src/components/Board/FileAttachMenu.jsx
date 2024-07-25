import React, { useState } from 'react';
import { Modal, Box, Grid, Typography, IconButton } from '@mui/material';
import AttachmentIcon from '@mui/icons-material/Attachment';

const FileAttach = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <AttachmentIcon />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 375,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">사진</Typography>
            </Grid>
            <Grid item xs={12} container spacing={1}>
              {[...Array(3)].map((_, index) => (
                <Grid item xs={4} key={index}>
                  <Box sx={{ width: '100%', height: 100, bgcolor: 'grey.300' }} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">첨부파일</Typography>
            </Grid>
            <Grid item xs={12} container spacing={1}>
              {[...Array(3)].map((_, index) => (
                <Grid item xs={4} key={index}>
                  <Box sx={{ width: '100%', height: 100, bgcolor: 'grey.300' }} />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default FileAttach;
