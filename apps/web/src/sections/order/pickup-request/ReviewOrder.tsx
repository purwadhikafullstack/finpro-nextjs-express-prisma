import React from 'react';

// material-ui
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// Types
import { UserAddressData, ClosestOutletAddressData } from './PickupForm';

interface ReviewProps {
  chosenAddress: UserAddressData;
  closestOutlet: ClosestOutletAddressData;
  cost: string;
}

export default function Review({ chosenAddress, closestOutlet, cost }: ReviewProps) {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Review Your Order
      </Typography>
      <List disablePadding>
        {/* Review Selected Address */}
        <ListItem sx={{ py: 1, px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Selected Address
          </Typography>
          <Typography variant="body2">
            {chosenAddress.user_address_name}
          </Typography>
          <Typography variant="body2">{chosenAddress.street_address}</Typography>
          <Typography variant="body2">
            {chosenAddress.city}, {chosenAddress.province}
          </Typography>
          <Typography variant="body2">{chosenAddress.postal_code}</Typography>
        </ListItem>
        <Divider sx={{ my: 2 }} />

        {/* Review Closest Outlet */}
        <ListItem sx={{ py: 1, px: 0, flexDirection: 'column', alignItems: 'flex-start' }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            Closest Outlet
          </Typography>
          <Typography variant="body2">
            {closestOutlet.closest_outlet_name}
          </Typography>
          <Typography variant="body2">{closestOutlet.street_address}</Typography>
          <Typography variant="body2">
            {closestOutlet.city}, {closestOutlet.province}
          </Typography>
          <Typography variant="body2">{closestOutlet.postal_code}</Typography>
        </ListItem>
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
