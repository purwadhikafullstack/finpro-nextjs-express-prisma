import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { SelectChangeEvent } from '@mui/material/Select';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CancelIcon,
} from '@mui/icons-material';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';
import { ThemeMode } from 'config';
import instance from 'utils/axiosIntance';

// assets
import { Camera } from 'iconsax-react';

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

export default function TabPersonal() {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  );
  const [avatar, setAvatar] = useState<string | undefined>('');

  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    avatarFilename: '',
  });

  const [addresses, setAddresses] = useState<any[]>([]); // to store address data from the API

  // Update avatar if selectedImage changes
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // Fetch user profile and address data from API
  const fetchUserData = async () => {
    try {
      const [profileRes, addressRes] = await Promise.all([
        instance().get('http://localhost:8000/api/user/profile'),
        instance().get('http://localhost:8000/api/user/address'),
      ]);

      const userProfile = profileRes.data?.data;
      setProfile(userProfile);
      setAvatar(
        `http://localhost:8000/static/avatar/${userProfile.avatarFilename}`,
      ); // Set avatar from API
      setAddresses(addressRes.data?.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Update Profile API call
  const handleUpdateProfile = async () => {
    try {
      await instance().patch(
        'http://localhost:8000/api/user/profile-update',
        profile,
      );
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  // Add new address
  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        name: '',
        street_address: '',
        city: '',
        province: '',
        postal_code: '',
        isEditing: true,
      },
    ]);
  };

  // Edit address
  const handleEditAddress = (index: number) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, isEditing: true } : address,
    );
    setAddresses(updatedAddresses);
  };

  // Save address (API call to update/create)
  const handleSaveAddress = async (index: number) => {
    const address = addresses[index];
    try {
      if (address.id) {
        // Edit existing address
        await instance().put(
          `http://localhost:8000/api/user/address/${address.id}`,
          address,
        );
      } else {
        // Add new address
        await instance().post(
          'http://localhost:8000/api/user/address',
          address,
        );
      }
      const updatedAddresses = addresses.map((addr, i) =>
        i === index ? { ...addr, isEditing: false } : addr,
      );
      setAddresses(updatedAddresses);
      fetchUserData(); // Refresh the addresses list
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  // Cancel editing
  const handleCancelEdit = (index: number) => {
    const updatedAddresses = addresses.filter(
      (_, i) => !(i === index && addresses[index].name === ''),
    );
    const addressesWithCancel = updatedAddresses.map((address, i) => ({
      ...address,
      isEditing: false,
    }));
    setAddresses(addressesWithCancel);
  };

  // Handle address field change
  const handleAddressChange = (index: number, field: string, value: string) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, [field]: value } : address,
    );
    setAddresses(updatedAddresses);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Personal Information */}
      <Grid item xs={12} md={9}>
        <MainCard title="Personal Information">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                <FormLabel
                  htmlFor="change-avatar"
                  sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    '&:hover .MuiBox-root': { opacity: 1 },
                    cursor: 'pointer',
                  }}
                >
                  <Avatar
                    alt="Avatar 1"
                    src={avatar}
                    sx={{ width: 76, height: 76 }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      backgroundColor:
                        theme.palette.mode === ThemeMode.DARK
                          ? 'rgba(255, 255, 255, .75)'
                          : 'rgba(0,0,0,.65)',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Stack spacing={0.5} alignItems="center">
                      <Camera
                        style={{
                          color: theme.palette.secondary.lighter,
                          fontSize: '1.5rem',
                        }}
                      />
                      <Typography
                        sx={{ color: 'secondary.lighter' }}
                        variant="caption"
                      >
                        Upload
                      </Typography>
                    </Stack>
                  </Box>
                </FormLabel>
                <TextField
                  type="file"
                  id="change-avatar"
                  placeholder="Outlined"
                  variant="outlined"
                  sx={{ display: 'none' }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedImage(e.target.files?.[0])
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-first-name">
                  First Name
                </InputLabel>
                <TextField
                  fullWidth
                  value={profile.first_name}
                  onChange={(e) =>
                    setProfile({ ...profile, first_name: e.target.value })
                  }
                  id="personal-first-name"
                  placeholder="First Name"
                  autoFocus
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                <TextField
                  fullWidth
                  value={profile.last_name}
                  onChange={(e) =>
                    setProfile({ ...profile, last_name: e.target.value })
                  }
                  id="personal-last-name"
                  placeholder="Last Name"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-phone">Phone Number</InputLabel>
                <PatternFormat
                  format="+62 ### #### #####"
                  fullWidth
                  customInput={TextField}
                  value={profile.phone_number}
                  onChange={(e) =>
                    setProfile({ ...profile, phone_number: e.target.value })
                  }
                  placeholder="Phone Number"
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-email">Email Address</InputLabel>
                <TextField
                  type="email"
                  fullWidth
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  id="personal-email"
                  placeholder="Email Address"
                />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                spacing={2}
              >
                <Button variant="outlined" color="secondary">
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleUpdateProfile}>
                  Update Profile
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Addresses Card */}
      <Grid item xs={12} md={9}>
        <MainCard title="Addresses">
          <List sx={{ py: 0 }}>
            {addresses.map((address, index) => (
              <ListItem key={index} divider sx={{ position: 'relative' }}>
                <Grid container spacing={3}>
                  {address.isEditing ? (
                    <>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <TextField
                            fullWidth
                            label="Address Name"
                            value={address.name}
                            onChange={(e) =>
                              handleAddressChange(index, 'name', e.target.value)
                            }
                          />
                          <TextField
                            fullWidth
                            label="Street Address"
                            value={address.street_address}
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                'street_address',
                                e.target.value,
                              )
                            }
                          />
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={0.5}>
                          <TextField
                            fullWidth
                            label="City"
                            value={address.city}
                            onChange={(e) =>
                              handleAddressChange(index, 'city', e.target.value)
                            }
                          />
                          <TextField
                            fullWidth
                            label="Province"
                            value={address.province}
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                'province',
                                e.target.value,
                              )
                            }
                          />
                          <TextField
                            fullWidth
                            label="Postal Code"
                            value={address.postal_code}
                            onChange={(e) =>
                              handleAddressChange(
                                index,
                                'postal_code',
                                e.target.value,
                              )
                            }
                          />
                        </Stack>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sx={{
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: 2,
                        }}
                      >
                        <Button
                          onClick={() => handleCancelEdit(index)}
                          variant="outlined"
                          sx={{ minWidth: 32, padding: '6px' }}
                        >
                          <CancelIcon />
                        </Button>
                        <Button
                          onClick={() => handleSaveAddress(index)}
                          variant="contained"
                          sx={{ minWidth: 32, padding: '6px' }}
                        >
                          <CheckIcon />
                        </Button>
                      </Grid>
                    </>
                  ) : (
                    <>
                      <Grid item xs={12} md={6}>
                        <Typography>{address.name}</Typography>
                        <Typography>{address.street_address}</Typography>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Typography>{address.city}</Typography>
                        <Typography>{address.province}</Typography>
                        <Typography>{address.postal_code}</Typography>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          position: 'absolute',
                          top: 10,
                          right: 10,
                          zIndex: 1,
                        }}
                      >
                        <Button
                          onClick={() => handleEditAddress(index)}
                          variant="outlined"
                          sx={{ minWidth: 32, padding: '6px' }}
                        >
                          <EditIcon />
                        </Button>
                      </Grid>
                    </>
                  )}
                </Grid>
              </ListItem>
            ))}
          </List>
          <Button
            onClick={handleAddAddress}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            + Add Address
          </Button>
        </MainCard>
      </Grid>
    </Grid>
  );
}
