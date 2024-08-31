import React, { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Types
import { UserAddressData } from './PickupForm';

interface ReviewProps {
  userAddressData: UserAddressData;
  closestOutlet: string; // This should be the outlet ID or name
  cost: string;
}

interface AddressDetails {
  name?: string; // Optional, used for outlets
  street_address: string;
  city: string;
  province: string;
  postal_code: string;
}

export default function Review({ userAddressData, closestOutlet, cost }: ReviewProps) {
  const [addressDetails, setAddressDetails] = useState<AddressDetails | null>(null);
  const [outletAddressDetails, setOutletAddressDetails] = useState<AddressDetails | null>(null);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        if (userAddressData.address) {
          const response = await axios.get(`/api/useraddresses/${userAddressData.address}`);
          setAddressDetails(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch address details:', error);
      }
    };

    fetchAddressDetails();
  }, [userAddressData.address]);

  useEffect(() => {
    const fetchOutletAddressDetails = async () => {
      try {
        if (closestOutlet) {
          const response = await axios.get(`/api/outletaddresses/${closestOutlet}`);
          setOutletAddressDetails(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch outlet address details:', error);
      }
    };

    fetchOutletAddressDetails();
  }, [closestOutlet]);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Review Your Order
      </Typography>
      <List disablePadding>
        {/* Review Address */}
        {addressDetails ? (
          <ListItem sx={{ py: 1, px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemText primary="Selected Address" />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {addressDetails.name}
            </Typography>
            <Typography variant="body2">{addressDetails.street_address}</Typography>
            <Typography variant="body2">
              {addressDetails.city}, {addressDetails.province}
            </Typography>
            <Typography variant="body2">{addressDetails.postal_code}</Typography>
          </ListItem>
        ) : (
          <ListItem sx={{ py: 1, px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemText primary="Selected Address" />
            <Typography variant="body2">Loading address details...</Typography>
          </ListItem>
        )}
        <Divider sx={{ my: 2 }} />

        {/* Review Closest Outlet */}
        {outletAddressDetails ? (
          <ListItem sx={{ py: 1, px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemText primary="Closest Outlet" />
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
              {outletAddressDetails.name}
            </Typography>
            <Typography variant="body2">{outletAddressDetails.street_address}</Typography>
            <Typography variant="body2">
              {outletAddressDetails.city}, {outletAddressDetails.province}
            </Typography>
            <Typography variant="body2">{outletAddressDetails.postal_code}</Typography>
          </ListItem>
        ) : (
          <ListItem sx={{ py: 1, px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
            <ListItemText primary="Closest Outlet" />
            <Typography variant="body2">Loading outlet details...</Typography>
          </ListItem>
        )}
        <Divider sx={{ my: 2 }} />

        {/* Review Pickup/Delivery Cost */}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Pickup/Delivery Cost" />
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {cost}
          </Typography>
        </ListItem>
      </List>

      <Divider sx={{ my: 2 }} />
    </>
  );
}
