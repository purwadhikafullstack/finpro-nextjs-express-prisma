import React from 'react';
import { Skeleton } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MainCard from 'components/MainCard';

export default function TabPersonalShimmer() {
  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Personal Information Shimmer */}
      <Grid item xs={12} md={9}>
        <MainCard title={<Skeleton width="40%" />}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                <Skeleton variant="circular" width={76} height={76} />
                <Skeleton variant="rectangular" width={100} height={30} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Skeleton width="30%" />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Skeleton width="30%" />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Skeleton width="30%" />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <Skeleton width="30%" />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Skeleton variant="rectangular" width={100} height={40} />
                <Skeleton variant="rectangular" width={150} height={40} />
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Addresses Shimmer */}
      <Grid item xs={12} md={9}>
        <MainCard title={<Skeleton width="40%" />}>
          <List sx={{ py: 0 }}>
            {[1, 2, 3].map((_, index) => (
              <ListItem key={index} divider sx={{ position: 'relative' }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Skeleton width="60%" height={30} />
                    <Skeleton width="80%" height={25} />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Skeleton width="60%" height={30} />
                    <Skeleton width="80%" height={25} />
                    <Skeleton width="50%" height={25} />
                  </Grid>
                </Grid>
              </ListItem>
            ))}
          </List>
          <Skeleton
            variant="rectangular"
            width={150}
            height={40}
            sx={{ mt: 2 }}
          />
        </MainCard>
      </Grid>
    </Grid>
  );
}
