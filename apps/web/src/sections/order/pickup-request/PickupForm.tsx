// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useEffect, useState } from 'react';

// next.js
import { useRouter } from 'next/navigation';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import MainCard from 'components/MainCard'; // Import MainCard for styling
import instance from 'utils/axiosIntance';

// Validation schema
const validationSchema = yup.object({
  chosenAddress: yup.object({
    user_address_id: yup
      .number()
      .typeError('Address is required') // Handles cases where the value might not be a number
      .required('Address is required')
      .min(1, 'Address is required'),
  }),
});

export type ClosestOutletAddressData = { 
  closest_outlet_id: number,
  closest_outlet_name: string,
  street_address: string,
  city: string,
  province: string,
  postal_code: string};

export type UserAddressData = { 
  user_address_id: number,
  user_address_name: string,
  street_address: string,
  city: string,
  province: string,
  postal_code: string};

export const initialUserAddressData: UserAddressData = {
  user_address_id: 0,
  user_address_name: '',
  street_address: '',
  city: '',
  province: '',
  postal_code: ''
};

export const initialClosestOutletData: ClosestOutletAddressData = {
  closest_outlet_id: 0,
  closest_outlet_name: 'Retrieving...',
  street_address: '',
  city: '',
  province: '',
  postal_code: ''
};

interface AddressFormProps {
  userId: number;
  chosenAddress: UserAddressData;
  setChosenAddress: (d: UserAddressData) => void;
  handleNext: () => void;
  setErrorIndex: (i: number | null) => void;
  closestOutlet: ClosestOutletAddressData;
  setClosestOutlet: (d: ClosestOutletAddressData) => void,
  cost: string,
  setCost: (d: string) => void,
}

export default function AddressForm({
  userId,
  chosenAddress,
  setChosenAddress,
  closestOutlet,
  setClosestOutlet,
  cost,
  setCost,
  handleNext,
  setErrorIndex,
}: AddressFormProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<UserAddressData[]>([]);

  useEffect(() => {
    // Fetch addresses from API
    const fetchAddresses = async () => {
      try {
        // const response = await instance().get('/users/${userId}/addresses');
        // setAddresses(response.data.data);
        setAddresses([
            {
              user_address_id: 1,
              user_address_name: 'addressNico1',
              street_address: '123 Main St',
              city: 'City1',
              province: 'Province1',
              postal_code: '12345',
            },
            {
              user_address_id: 2,
              user_address_name: 'addressNico2',
              street_address: '456 Elm St',
              city: 'City2',
              province: 'Province2',
              postal_code: '67890',
            }
        ])   // COMMENT THIS AND UNCOMMENT ABOVE
      } catch (error) {
        console.error('Failed to fetch addresses:', error);
      }
    };

    fetchAddresses();
  }, [userId]);

  const calculateClosestOutletAndCost = (user_address_id: number) => {
    // Simulate calculation of closest outlet and cost
    // REPLACE with real calculation logic based on selected address
    let closestOutlet = initialClosestOutletData;
    let cost = '$0';
    
    if (user_address_id===1) {
      closestOutlet = {
          closest_outlet_id: 1,
          closest_outlet_name: 'Outlet Terdekat 1',
          street_address: 'Jl1',
          city: 'C1',
          province: 'P1',
          postal_code: 'PC123'
        };
      cost = '$5';
    } else if (user_address_id===2) {
      closestOutlet = {
          closest_outlet_id: 2,
          closest_outlet_name: 'Outlet Terdekat 2',
          street_address: 'Jl2',
          city: 'C1',
          province: 'P1',
          postal_code: 'PC123'
        };
      cost = '$99';
    }

    setClosestOutlet(closestOutlet);
    setCost(cost);
  };

  const handleAddressChange = (event: any) => {
    const value = event.target.value;
    if (value === 'add-new') {
      router.push('/address'); // Navigate to the add new address page
    } else {
      const selectedAddressId = parseInt(value, 10);
      const selectedAddress = addresses.find(address => address.user_address_id === selectedAddressId) || initialUserAddressData;
      
      formik.setFieldValue("chosenAddress", selectedAddress);
      calculateClosestOutletAndCost(selectedAddress.user_address_id);
    }
  };

  const formik = useFormik({
    initialValues: {
      chosenAddress: chosenAddress,
    },
    validationSchema,
    onSubmit: (values) => {
      setChosenAddress(
        values.chosenAddress,
      );
      handleNext();
    },
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
        New Pickup Request
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2.5}>
          {/* Select Address */}
          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormControl fullWidth>
                {/* <InputLabel>Select Your Address</InputLabel> */}
                <Select
                  displayEmpty
                  id="chosenAddress"
                  name="chosenAddress.user_address_id"
                  value={formik.values.chosenAddress.user_address_id}
                  onChange={handleAddressChange}
                  error={formik.touched.chosenAddress?.user_address_id && Boolean(formik.errors.chosenAddress?.user_address_id)}
                >
                  <MenuItem disabled value="0" sx={{ color: 'text.secondary' }}>
                    Select Your Address
                  </MenuItem>
                  {/* Add New Address option */}
                  <MenuItem value="add-new">
                    <em>Add New Address</em>
                  </MenuItem>
                  {/* Dynamic addresses */}
                  {addresses.map((address) => (
                    <MenuItem key={address.user_address_id} value={address.user_address_id}>
                      {address.user_address_name}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.chosenAddress?.user_address_id && formik.errors.chosenAddress?.user_address_id && (
                  <Typography variant="caption" color="error">
                    {formik.errors.chosenAddress.user_address_id}
                  </Typography>
                )}
              </FormControl>
            </Stack>
          </Grid>

          {/* Display Closest Outlet */}
          <Grid item xs={12}>
            <Stack spacing={1}>
              <MainCard content={false} sx={{ padding: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Closest Outlet
                </Typography>
                <Divider sx={{ my: 1 }} /> {/* This adds a line separator */}
                <Typography variant="body1">
                  {closestOutlet.closest_outlet_name}
                </Typography>
              </MainCard>
            </Stack>
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

          {/* Next Button */}
          <Grid item xs={12} >
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
