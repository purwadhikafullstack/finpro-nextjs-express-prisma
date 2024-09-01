// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import FadeInWhenVisible from './Animation';

// ==============================|| LANDING - CONTACT-US PAGE ||============================== //

export default function ContactUsPage() {
  return (
    <Box sx={{ bgcolor: 'secondary.200', pb: { md: 10, xs: 7 }, pt: 0.25 }}>
      <Container>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ mt: { md: 10, xs: 2.5 } }}
        >
          <Grid item xs={12} md={8}>
            <FadeInWhenVisible>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12}>
                  <Typography variant="h2">Stay connected with us</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    Simply submit your email, we share you the top news related
                    to LaundryXpert feature updates, roadmap, and news.
                  </Typography>
                </Grid>
              </Grid>
            </FadeInWhenVisible>
          </Grid>
          <Grid item xs={12} md={4}>
            <FadeInWhenVisible>
              <Grid
                container
                spacing={2}
                justifyContent={{ md: 'end', xs: 'center' }}
                alignItems="center"
              >
                <Grid item>
                  <TextField
                    id="firstNameBasic"
                    name="firstName"
                    placeholder="Enter your email"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" size="large">
                    Subscribe
                  </Button>
                </Grid>
              </Grid>
            </FadeInWhenVisible>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
