'use client';

import { ReactElement } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

// project-imports
import AuthCard from './AuthCard';

// assets
const AuthSideImg = '/assets/images/auth/img-auth-sideimg.png';

interface Props {
  children: ReactElement;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper2({ children }: Props) {
  return (
    <Box sx={{ minHeight: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        sx={{ minHeight: '100vh', bgcolor: 'background.paper' }}
      >
        <Grid item xs={12}>
          <Grid
            item
            xs={12}
            container
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: {
                xs: 'calc(100vh - 210px)',
                sm: 'calc(100vh - 134px)',
                md: 'calc(100vh - 112px)',
              },
            }}
          >
            <Grid
              item
              md={7}
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignSelf: 'center',
                justifyContent: 'flex-start',
                '& img': {
                  height: '100vh',
                  minHeight: '100%',
                  position: 'relative',
                  width: '100%',
                },
              }}
            >
              <CardMedia component={'img'} src={AuthSideImg} />
            </Grid>
            <Grid
              item
              md={5}
              sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}
            >
              <AuthCard border={false}>{children}</AuthCard>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
