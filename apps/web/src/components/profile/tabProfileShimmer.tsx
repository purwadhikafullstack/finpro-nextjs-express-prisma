import {
  Box,
  Grid,
  Stack,
  Typography,
  Avatar,
  Divider,
  Chip,
  List,
  ListItem,
  Skeleton,
} from '@mui/material';
import MainCard from 'components/MainCard';

export default function TabProfileShimmer() {
  return (
    <Grid container spacing={3}>
      {/* Left Section (Profile Card) */}
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Skeleton variant="rounded" width={20} height={20} />
                  </Stack>
                  <Stack spacing={2.5} alignItems="center">
                    <Skeleton variant="circular">
                      <Avatar sx={{ width: 76, height: 76 }} />
                    </Skeleton>
                    <Stack spacing={0.5} alignItems="center">
                      <Skeleton width={150} height={30} />
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List
                    component="nav"
                    aria-label="main mailbox folders"
                    sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}
                  >
                    <ListItem>
                      <Skeleton width="80%" height={20} />
                    </ListItem>
                    <ListItem>
                      <Skeleton width="80%" height={20} />
                    </ListItem>
                    <ListItem>
                      <Skeleton width="80%" height={20} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>

      {/* Right Section (Details & Addresses) */}
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          {/* Personal Details Card */}
          <Grid item xs={12}>
            <MainCard title="Personal Details">
              <List sx={{ py: 0 }}>
                <ListItem divider>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Skeleton width="40%" height={20} />
                        <Skeleton width="80%" height={25} />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Skeleton width="40%" height={20} />
                        <Skeleton width="80%" height={25} />
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Skeleton width="40%" height={20} />
                        <Skeleton width="80%" height={25} />
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Skeleton width="40%" height={20} />
                        <Skeleton width="80%" height={25} />
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>

          {/* Addresses Card */}
          <Grid item xs={12}>
            <MainCard title="Addresses">
              <List sx={{ py: 0 }}>
                {[1, 2, 3].map((_, index) => (
                  <ListItem key={index} divider>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Skeleton width="30%" height={25} />
                          <Skeleton width="100%" height={20} />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Skeleton width="40%" height={20} />
                          <Skeleton width="100%" height={20} />
                        </Stack>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
