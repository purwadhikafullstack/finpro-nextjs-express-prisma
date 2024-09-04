// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import OrderList from 'sections/order/order-list/OrderList';

// ==============================|| Pickup Request ||============================== //

export default function OrderDetailsPage() {
  // Assuming you have access to customerId somehow (e.g., from context, router, or state)
  const customerId = '1'; // REPLACE1 this with actual customer ID source
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <OrderList customerId={customerId}/>
      </Grid>
    </Grid>
  );
}
