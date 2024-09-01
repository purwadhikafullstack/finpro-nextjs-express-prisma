'use client';

// material-ui
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';

// assets
const laundryPickup = '/assets/images/landing/laundry-pickup.png';
const expressWash = '/assets/images/landing/express-wash.png';
const dryCleaning = '/assets/images/landing/dry-cleaning.png';

const Technologies = [
  {
    icon: laundryPickup,
    title: 'Laundry Pickup Service',
    description:
      'We provide door-to-door laundry pickup and delivery without any minimum spend. Just schedule a pickup, and we’ll handle the rest.',
  },
  {
    icon: expressWash,
    title: 'Express Wash & Fold',
    description:
      'Need your laundry done in a hurry? Our Express Wash & Fold service guarantees a 24-hour turnaround time.',
  },
  {
    icon: dryCleaning,
    title: 'Dry Cleaning Service',
    description:
      'Keep your delicate garments pristine with our premium dry cleaning service, expertly handling everything from suits to silk dresses with care and precision.',
  },
];

// ==============================|| LANDING - COMBO PAGE ||============================== //

export default function ComboPage() {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ mt: { md: 15, xs: 2.5 }, mb: { md: 10, xs: 2.5 } }}
      >
        <Grid item xs={12}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ textAlign: 'center', marginBottom: 3 }}
          >
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.2,
                }}
              >
                <Typography variant="h2">
                  What's Included in the Service?
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={7}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4,
                }}
              >
                <Typography>
                  LaundryXpert provides easy pickup, expert care, and delivery.
                  Simple, reliable laundry services tailored to you.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3} alignItems="center">
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Typography variant="h5">{tech.title}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <CardMedia
                          component="img"
                          image={tech.icon}
                          sx={{ width: '100%' }}
                        />
                      </Grid>
                    </Grid>
                  </MainCard>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
