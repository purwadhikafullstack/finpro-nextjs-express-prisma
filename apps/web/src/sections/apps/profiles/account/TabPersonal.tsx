import { useEffect, useState, ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MainCard from 'components/MainCard';
import AvatarUpload from 'components/profiles/tabPersonal/AvatarUpload';
import PersonalInfoForm from 'components/profiles/tabPersonal/PersonalInfoForm';
import AddressList from 'components/profiles/tabPersonal/AddressList';
import ConfirmModal from 'components/modal/ConfirmModal'; // Tambahkan konfirmasi modal
import instance from 'utils/axiosIntance';
import TabPersonalShimmer from 'components/profiles/shimmer/tabPersonalShimmer';

// Define Profile interface
interface Profile {
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  avatarFilename: string;
}

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

export default function TabPersonal() {
  const [selectedImage, setSelectedImage] = useState<File | undefined>(
    undefined,
  );
  const [avatar, setAvatar] = useState<string | undefined>('');
  const [loading, setLoading] = useState(true);

  // Track nilai awal profile
  const [initialProfile, setInitialProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    avatarFilename: '',
  });

  const [profile, setProfile] = useState<Profile>({
    first_name: '',
    last_name: '',
    phone_number: '',
    email: '',
    avatarFilename: '',
  });

  const [addresses, setAddresses] = useState<any[]>([]);

  // Track button disable state
  const [isDisabled, setIsDisabled] = useState(true);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );

  // Confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmEmailOpen, setConfirmEmailOpen] = useState(false); // State for email confirm modal

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const fetchUserData = async () => {
    try {
      const [profileRes, addressRes] = await Promise.all([
        instance().get('http://localhost:8000/api/user/profile'),
        instance().get('http://localhost:8000/api/user/address'),
      ]);
      const userProfile = profileRes.data?.data;
      setProfile(userProfile);
      setInitialProfile(userProfile); // Simpan nilai awal profil
      setAvatar(
        `http://localhost:8000/static/avatar/${userProfile.avatarFilename}`,
      );
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

  // Pengecekan perubahan untuk enable/disable tombol
  useEffect(() => {
    const isChanged = Object.keys(profile).some(
      (key) =>
        key !== 'email' &&
        profile[key as keyof Profile] !== initialProfile[key as keyof Profile],
    );
    setIsDisabled(!isChanged && !selectedImage);
  }, [profile, initialProfile, selectedImage]);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      const changedFields: Partial<Profile> = {};

      // Bandingkan initialProfile dengan profile sekarang dan hanya kirim data yang berubah
      for (const key in profile) {
        if (
          profile[key as keyof Profile] !== initialProfile[key as keyof Profile]
        ) {
          changedFields[key as keyof Profile] = profile[key as keyof Profile];
        }
      }

      // Append perubahan yang terjadi ke dalam formData
      for (const key in changedFields) {
        formData.append(key, changedFields[key as keyof Profile] as string);
      }

      // Jika ada perubahan avatar
      if (selectedImage) {
        formData.append('file', selectedImage);
      }

      await instance().patch(
        'http://localhost:8000/api/user/profile-update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setSnackbarMessage('Profile updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbarMessage('Failed to update profile. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setConfirmOpen(false);
    }
  };

  // Handle confirm modal untuk update profile
  const handleOpenConfirm = () => {
    setConfirmOpen(true);
  };

  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  // Handle khusus untuk update email
  const handleUpdateEmail = () => {
    setConfirmEmailOpen(true); // Buka modal konfirmasi untuk email
  };

  const handleConfirmEmailChange = async () => {
    try {
      const formData = new FormData();
      formData.append('email', profile.email); // Hanya kirim email

      await instance().patch(
        'http://localhost:8000/api/user/profile-update',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      setSnackbarMessage('Email updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error updating email:', error);
      setSnackbarMessage('Failed to update email. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setConfirmEmailOpen(false);
    }
  };

  const handleDeleteAddress = async (user_address_id: number) => {
    try {
      await instance().delete(
        `http://localhost:8000/api/user/address/${user_address_id}`,
      );

      const updatedAddresses = addresses.filter(
        (address) => address.user_address_id !== user_address_id,
      );
      setAddresses(updatedAddresses);

      setSnackbarMessage('Address deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error deleting address:', error);
      setSnackbarMessage('Failed to delete address. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSetPrimaryAddress = async (user_address_id: number) => {
    try {
      await instance().patch(
        `http://localhost:8000/api/user/address/${user_address_id}/set-primary`,
      );

      fetchUserData(); // Refresh addresses after setting primary

      setSnackbarMessage('Primary address set successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error setting primary address:', error);
      setSnackbarMessage('Failed to set primary address. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        name: '',
        street_address: '',
        city: '',
        province: '',
        postal_code: '',
        is_primary: false,
        isEditing: true,
      },
    ]);
  };

  const handleEditAddress = (index: number) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, isEditing: true } : address,
    );
    setAddresses(updatedAddresses);
  };

  const handleSaveAddress = async (index: number) => {
    const address = addresses[index];
    try {
      if (address.user_address_id) {
        await instance().patch(
          `http://localhost:8000/api/user/address/${address.user_address_id}`,
          address,
        );
      } else {
        await instance().post(
          'http://localhost:8000/api/user/address',
          address,
        );
      }
      const updatedAddresses = addresses.map((addr, i) =>
        i === index ? { ...addr, isEditing: false } : addr,
      );
      setAddresses(updatedAddresses);
      fetchUserData();

      setSnackbarMessage('Address saved successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error saving address:', error);
      setSnackbarMessage('Failed to save address. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

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

  const handleAddressChange = (index: number, field: string, value: string) => {
    const updatedAddresses = addresses.map((address, i) =>
      i === index ? { ...address, [field]: value } : address,
    );
    setAddresses(updatedAddresses);
  };

  if (loading) {
    return <TabPersonalShimmer />;
  }

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={9}>
          <MainCard title="Personal Information">
            <AvatarUpload
              avatar={avatar!}
              onImageChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSelectedImage(e.target.files?.[0])
              }
            />
            <PersonalInfoForm
              profile={profile}
              onProfileChange={handleProfileChange}
              handleUpdateProfile={handleOpenConfirm} // Trigger confirmation dialog
              handleUpdateEmail={handleUpdateEmail} // Handle email update
              isDisabled={isDisabled} // Disable button when no changes
            />
          </MainCard>
        </Grid>

        {/* Addresses Card */}
        <Grid item xs={12} md={9}>
          <MainCard title="Addresses">
            <AddressList
              addresses={addresses}
              handleEditAddress={handleEditAddress}
              handleSaveAddress={handleSaveAddress}
              handleCancelEdit={handleCancelEdit}
              handleAddressChange={handleAddressChange}
              handleAddAddress={handleAddAddress}
              handleDeleteAddress={handleDeleteAddress}
              handleSetPrimaryAddress={handleSetPrimaryAddress}
            />
          </MainCard>
        </Grid>
      </Grid>

      {/* Snackbar Component */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Modal for Profile Update */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleUpdateProfile}
        title="Confirm Profile Update"
        message="Are you sure you want to update your profile?"
        confirmText="Yes, Update"
        cancelText="Cancel"
      />

      {/* Confirmation Modal for Email Change */}
      <ConfirmModal
        open={confirmEmailOpen}
        onClose={() => setConfirmEmailOpen(false)}
        onConfirm={handleConfirmEmailChange}
        title="Confirm Email Change"
        message="Are you sure you want to update your email address?"
        confirmText="Yes, Update Email"
        cancelText="Cancel"
      />
    </>
  );
}
