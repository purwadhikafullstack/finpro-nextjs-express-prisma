'use client';

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Links from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Truck } from 'iconsax-react';
import { useAppSelector } from 'libs/hooks';

const RequestPickup = () => {
  const { loginStatus } = useAppSelector((state: any) => state.auth);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!loginStatus.isLogin) {
      e.preventDefault();
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const url = '/pickup-request';

  return (
    <>
      <Links
        style={{ textDecoration: 'none' }}
        href={loginStatus.isLogin ? url : '#'}
        onClick={handleClick}
        target="_blank"
      >
        <Button
          variant="contained"
          color="error"
          sx={{
            zIndex: 1200,
            position: 'fixed',
            bottom: 50,
            right: 30,
            display: 'flex',
            backgroundColor: loginStatus.isLogin ? '#d32f2f' : 'gray',
            '&:hover': {
              backgroundColor: loginStatus.isLogin ? '#b71c1c' : 'gray',
            },
            '@media (max-width:600px)': {
              bottom: 20,
              right: 20,
            },
          }}
        >
          <ListItemIcon>
            <Truck style={{ color: '#ffffff' }} />{' '}
          </ListItemIcon>
          Pickup
        </Button>
      </Links>

      {/* Snackbar for showing login required message */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Please login to request a pickup.
        </Alert>
      </Snackbar>
    </>
  );
};

export default RequestPickup;
