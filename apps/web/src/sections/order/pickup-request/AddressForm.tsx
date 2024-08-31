// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';

// next.js
import { useRouter } from 'next/navigation';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard'; // Import MainCard for styling

// Validation schema
const validationSchema = yup.object({
  address: yup.string().required('Address is required'),
});

export type ShippingData = {
  address?: string;
};

interface AddressFormProps {
  userId: number;
  shippingData: ShippingData;
  setShippingData: (d: ShippingData) => void;
  handleNext: () => void;
  setErrorIndex: (i: number | null) => void;
}

export default function AddressForm({
  userId,
  shippingData,
  setShippingData,
  handleNext,
  setErrorIndex,
}: AddressFormProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<{ id: string; name: string }[]>([]);
  const [closestOutlet, setClosestOutlet] = useState<string>('Retrieving...');
  const [cost, setCost] = useState<string>('Calculating...');

  useEffect(() => {
    // Fetch addresses from API
    const fetchAddresses = async () => {
      try {
        const response = await axios.get(`/api/users/${userId}/addresses`);
        setAddresses(response.data);
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const calculateClosestOutletAndCost = (addressId: string) => {
    // Simulate calculation of closest outlet and cost
    // Replace with real calculation logic based on selected address
    const closestOutlet = 'Outlet 1'; // Placeholder value
    const cost = '$10.00'; // Placeholder value

    setClosestOutlet(closestOutlet);
    setCost(cost);
  };

  const handleAddressChange = (event: any) => {
    const value = event.target.value;
    if (value === 'add-new') {
      router.push('/auth/address'); // Navigate to the add new address page
    } else {
      formik.handleChange(event);
      calculateClosestOutletAndCost(value);
    }
  };

  const formik = useFormik({
    initialValues: {
      address: shippingData.address || '',
    },
    validationSchema,
    onSubmit: (values) => {
      setShippingData({
        address: values.address,
      });
      handleNext();
    },
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        New Pickup Request
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {/* Select Address */}
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormControl fullWidth>
                <InputLabel>Select Your Address</InputLabel>
                <Select
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={handleAddressChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                >
                  {/* Add New Address option */}
                  <MenuItem value="add-new">
                    <em>Add New Address</em>
                  </MenuItem>
                  <MenuItem value="address1">Address 1</MenuItem> {/* NEED TO BE COMMENTED */}
                  {/* Dynamic addresses */}
                  {addresses.map((address) => (
                    <MenuItem key={address.id} value={address.id}>
                      {address.name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.address && formik.errors.address && (
                  <Typography variant="caption" color="error">
                    {formik.errors.address}
                  </Typography>
                )}
              </FormControl>
            </Stack>
          </Grid>

          {/* Display Closest Outlet */}
          <Grid item xs={12}>
            <MainCard content={false} sx={{ padding: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Closest Outlet
              </Typography>
              <Divider sx={{ my: 1 }} /> {/* This adds a line separator */}
              <Typography variant="body1">
                {closestOutlet}
              </Typography>
            </MainCard>
          </Grid>

          {/* Pickup/Delivery Cost */}
          <Grid item xs={12}>
            <MainCard content={false} sx={{ padding: 2 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Pickup/Delivery Cost
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {cost}
                </Typography>
              </Stack>
            </MainCard>
          </Grid>

          {/* Request Pickup Button */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
