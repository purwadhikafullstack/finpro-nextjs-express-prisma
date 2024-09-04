import React from 'react';
import Button from '@mui/material/Button';
import Links from '@mui/material/Link';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Truck } from 'iconsax-react';

const RequestPickup = () => {
  const url = '/#';

  return (
    <Links style={{ textDecoration: 'none' }} href={url} target="_blank">
      <Button
        variant="contained"
        color="error"
        sx={{
          zIndex: 1200,
          position: 'fixed',
          bottom: 50,
          right: 30,
          display: 'flex',
          backgroundColor: '#d32f2f',
          '&:hover': {
            backgroundColor: '#b71c1c',
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
  );
};

export default RequestPickup;
