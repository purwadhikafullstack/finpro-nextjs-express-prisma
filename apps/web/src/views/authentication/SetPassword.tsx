// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthSetPassword from 'sections/auth/auth-forms/AuthSetPassword';

// ================================|| SET PASSWORD ||================================ //

export default function SetPasswordPage() {
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }} spacing={1}>
            <Typography variant="h3">Set Password</Typography>
            <Typography color="secondary">Please set your password</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <AuthSetPassword />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
