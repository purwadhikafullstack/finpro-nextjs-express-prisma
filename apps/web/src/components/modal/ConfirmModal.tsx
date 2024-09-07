'use client';

import { useState } from 'react';

// material-ui
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| MODAL - CONFIRMATION ||============================== //

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmModal = ({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
}: ConfirmModalProps) => (
  <Modal
    open={open}
    onClose={onClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <MainCard title={title} modal darkTitle content={false}>
      <CardContent>
        <Typography id="modal-modal-description">{message}</Typography>
      </CardContent>
      <Divider />
      <Stack
        direction="row"
        spacing={1}
        justifyContent="flex-end"
        sx={{ px: 2.5, py: 2 }}
      >
        <Button color="error" size="small" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="contained" size="small" onClick={onConfirm}>
          {confirmText}
        </Button>
      </Stack>
    </MainCard>
  </Modal>
);

export default ConfirmModal;
