'use client';

import { useEffect, useState } from 'react';

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
import instance from 'utils/axiosIntance';
import TabProfileShimmer from 'components/profile/tabProfileShimmer';

// assets
import { CallCalling, Gps, Sms } from 'iconsax-react';

// Interfaces
import { Address } from 'interfaces/profile/address.interface';
import { UserProfile } from 'interfaces/profile/userProfile.interface';

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

export default function TabProfile() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile>();
  const [addresses, setAddresses] = useState<Address[]>([]);

  const matchDownMD = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md'),
  );

  const avatarUrl = `http://localhost:8000/static/avatar/${profile?.avatarFilename}`;

  const userStatus = profile?.is_verified
    ? { label: 'VERIFIED', color: 'success' as const }
    : { label: 'UNVERIFIED', color: 'default' as const };

  const fetchUserData = async () => {
    try {
      const [profileRes, addressRes] = await Promise.all([
        instance().get('http://localhost:8000/api/user/profile'),
        instance().get('http://localhost:8000/api/user/address'),
      ]);

      setProfile(profileRes.data?.data);
      setAddresses(addressRes.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return <TabProfileShimmer />;
  }

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
                    <Avatar
                      alt="Avatar"
                      sx={{ width: 76, height: 76 }}
                      src={avatarUrl}
                    />
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">
                        {capitalize(profile?.first_name ?? '')}{' '}
                        {capitalize(profile?.last_name ?? '')}
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
                        <Typography align="right">{profile?.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CallCalling size={18} />
                      </ListItemIcon>
                      <ListItemSecondaryAction>
                        <Typography>
                          (+62){' '}
                          <PatternFormat
                            value={profile?.phone_number}
                            displayType="text"
                            format="### #### #####"
                          />
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
                        <Typography>
                          {capitalize(profile?.first_name ?? '')}
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Last Name</Typography>
                        <Typography>
                          {capitalize(profile?.last_name ?? '')}
                        </Typography>
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
                            value={profile?.phone_number}
                            displayType="text"
                            format="### #### #####"
                          />
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={0.5}>
                        <Typography color="secondary">Email</Typography>
                        <Typography>{profile?.email}</Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </ListItem>
              </List>
            </MainCard>
          </Grid>
          <Grid item xs={12}>
            <MainCard title="Addresses">
              <List sx={{ py: 0 }}>
                {addresses.map((address, index) => {
                  const {
                    name,
                    street_address,
                    city,
                    province,
                    postal_code,
                    is_primary,
                  } = address;

                  return (
                    <ListItem key={index} divider sx={{ position: 'relative' }}>
                      <Grid container spacing={matchDownMD ? 0.5 : 3}>
                        <Grid item xs={12} md={6}>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Typography variant="h6" fontWeight="bold">
                              {name}
                            </Typography>
                            {is_primary && (
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
                          <Typography>{street_address}</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">City</Typography>
                            <Typography>{city}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">Province</Typography>
                            <Typography>{province}</Typography>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Stack spacing={0.5}>
                            <Typography color="secondary">
                              Postal Code
                            </Typography>
                            <Typography>{postal_code}</Typography>
                          </Stack>
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                })}
              </List>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
