import { useState } from 'react';
import {
  Grid,
  Typography,
  Stack,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
} from '@mui/material';
import {
  Check as CheckIcon,
  Close as CancelIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
} from '@mui/icons-material';
import ConfirmModal from 'components/modal/ConfirmModal';

interface AddressListProps {
  addresses: any[];
  handleEditAddress: (index: number) => void;
  handleSaveAddress: (index: number) => void;
  handleCancelEdit: (index: number) => void;
  handleAddressChange: (index: number, field: string, value: string) => void;
  handleAddAddress: () => void;
  handleDeleteAddress: (user_address_id: number) => void;
  handleSetPrimaryAddress: (user_address_id: number) => void;
}

const AddressList = ({
  addresses,
  handleEditAddress,
  handleSaveAddress,
  handleCancelEdit,
  handleAddressChange,
  handleAddAddress,
  handleDeleteAddress,
  handleSetPrimaryAddress,
}: AddressListProps) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<
    'edit' | 'delete' | 'primary' | null
  >(null);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);

  const handleOpenConfirm = (
    type: 'edit' | 'delete' | 'primary',
    index: number,
  ) => {
    setConfirmType(type);
    setSelectedAddress(index);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (confirmType === 'delete' && selectedAddress !== null) {
      handleDeleteAddress(addresses[selectedAddress].user_address_id);
    } else if (confirmType === 'edit' && selectedAddress !== null) {
      handleSaveAddress(selectedAddress);
    } else if (confirmType === 'primary' && selectedAddress !== null) {
      handleSetPrimaryAddress(addresses[selectedAddress].user_address_id);
    }
    setConfirmOpen(false);
  };

  return (
    <>
      <List sx={{ py: 0 }}>
        {addresses.map((address, index) => (
          <ListItem key={index} divider sx={{ position: 'relative' }}>
            <Grid container spacing={2}>
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
                          handleAddressChange(index, 'province', e.target.value)
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
                    sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}
                  >
                    <Button
                      onClick={() => handleCancelEdit(index)}
                      variant="outlined"
                    >
                      <CancelIcon />
                    </Button>
                    <Button
                      onClick={() => handleOpenConfirm('edit', index)}
                      variant="contained"
                    >
                      <CheckIcon />
                    </Button>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                      {address.name}
                    </Typography>
                    <Typography>{address.street_address}</Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography>{address.city}</Typography>
                    <Typography>{address.province}</Typography>
                    <Typography>{address.postal_code}</Typography>
                  </Grid>

                  {/* Atur layout untuk mode mobile */}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'flex-start', md: 'flex-end' },
                      gap: 1,
                      mt: { xs: 1, md: 0 }, 
                    }}
                  >
                    <Stack
                      direction={{ xs: 'row', md: 'row' }} 
                      spacing={1}
                    >
                      {/* Star Icon for setting primary */}
                      <IconButton
                        onClick={() => handleOpenConfirm('primary', index)}
                        color="warning"
                      >
                        {address.is_primary ? <StarIcon /> : <StarBorderIcon />}
                      </IconButton>

                      <IconButton
                        onClick={() => handleEditAddress(index)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => handleOpenConfirm('delete', index)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Grid>
                </>
              )}
            </Grid>
          </ListItem>
        ))}
        <Button
          onClick={handleAddAddress}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          + Add Address
        </Button>
      </List>

      {/* Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title={
          confirmType === 'delete'
            ? 'Delete Address'
            : confirmType === 'primary'
              ? 'Set Primary Address'
              : 'Save Changes'
        }
        message={
          confirmType === 'delete'
            ? 'Are you sure you want to delete this address?'
            : confirmType === 'primary'
              ? 'Are you sure you want to set this address as primary?'
              : 'Are you sure you want to save the changes to this address?'
        }
        confirmText={
          confirmType === 'delete'
            ? 'Delete'
            : confirmType === 'primary'
              ? 'Set Primary'
              : 'Save'
        }
        cancelText="Cancel"
      />
    </>
  );
};

export default AddressList;
