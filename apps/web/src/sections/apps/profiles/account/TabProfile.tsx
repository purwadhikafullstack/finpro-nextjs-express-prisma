'use client';

import { useSelector } from 'react-redux';

// material-ui
import { Theme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import { capitalize } from 'utils/stringUtils';

// assets
import { CallCalling, Gps, Sms } from 'iconsax-react';

// data sementara, nanti di fetch
const addresses = [
  {
    name: 'Home',
    street:
      'Merdeka Square, Jalan Lapangan Monas, Gambir, Kecamatan Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta',
    city: 'Jakarta',
    province: 'Jakarta',
    postalCode: '10001',
    isPrimary: true,
  },
  {
    name: 'Office',
    street: 'Sinar Mas Land Plaza BSD City',
    city: 'Tangerang',
    province: 'Banten',
    postalCode: '94105',
    isPrimary: false,
  },
];

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

export default function TabProfile() {
  const matchDownMD = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const { user } = useSelector((state: any) => state.auth);

  const avatarUrl = `http://localhost:8000/static/avatar/${user.avatarFilename}`;

  const userStatus = user.isVerified
    ? { label: 'VERIFIED', color: 'success' as const }
    : { label: 'UNVERIFIED', color: 'default' as const };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack direction="row" justifyContent="flex-end">
                    <Chip
                      label={userStatus.label}
                      size="small"
                      color={userStatus.color}
                    />
                  </Stack>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar alt="Avatar" size="xl" src={avatarUrl} />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">
                        {capitalize(user.firstName)} {capitalize(user.lastName)}
                      </Typography>
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
                      <ListItemIcon>
                        <Sms size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">{user.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CallCalling size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">
                          {user.phoneNumber}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Gps size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography align="right">Indonesia</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard title="Personal Details">
              <List sx={{ py: 0 }}>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">First Name</Typography>
                        <Typography>{capitalize(user.firstName)}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Last Name</Typography>
                        <Typography>{capitalize(user.lastName)}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Phone</Typography>
                        <Typography>
                          (+62){' '}
                          <PatternFormat
                            value={user.phoneNumber}
                            displayType="text"
                            type="text"
                            format="### #### #####"
                          />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Country</Typography>
                        <Typography>Indonesia</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem divider={!matchDownMD}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        <Typography>{user.email}</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Zip Code</Typography>
                        <Typography>956 754</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Stack spacing={0.5}>
                    <Typography color="secondary">Address</Typography>
                    <Typography>
                      Merdeka Square, Jalan Lapangan Monas, Gambir, Kecamatan
                      Gambir, Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta
                    </Typography>
                  </Stack>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Addresses">
              <List sx={{ py: 0 }}>
                {addresses.map((address, index) => (
                  <ListItem key={index} divider sx={{ position: 'relative' }}>
                    <Grid container spacing={matchDownMD ? 0.5 : 3}>
                      <Grid item xs={12} md={6}>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="h6" fontWeight="bold">
                            {address.name}
                          </Typography>
                          {address.isPrimary && (
                            <Box
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                px: 0.8,
                                py: 0.3,
                                borderRadius: '10px',
                                fontSize: '12px',
                                display: 'inline-block',
                              }}
                            >
                              MAIN
                            </Box>
                          )}
                        </Stack>
                        <Typography>{address.street}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">City</Typography>
                          <Typography>{address.city}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Province</Typography>
                          <Typography>{address.province}</Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <Typography color="secondary">Postal Code</Typography>
                          <Typography>{address.postalCode}</Typography>
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
