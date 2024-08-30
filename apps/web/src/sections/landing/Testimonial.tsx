'use client';

// material-ui
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';

const client1 = '/assets/images/landing/client-eagames.svg';
const client2 = '/assets/images/landing/client-vodafone.svg';
const client3 = '/assets/images/landing/client-crystal-1.svg';
const client4 = '/assets/images/landing/client-haswent-2.svg';
const client5 = '/assets/images/landing/client-haxter-3.svg';
const client6 = '/assets/images/landing/client-montecito-4.svg';
const client7 = '/assets/images/landing/client-slingshot.svg';
const client8 = '/assets/images/landing/client-totalstudio-5.svg';

// ==============================|| LANDING - PARTNER PAGE ||============================== //
export default function PartnerPage() {
  const items = [
    { image: client1 },
    { image: client2 },
    { image: client3 },
    { image: client4 },
    { image: client5 },
    { image: client6 },
    { image: client7 },
    { image: client8 },
  ];
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
                <Typography variant="h2">Trusted By</Typography>
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
                  From Startups to Fortune 500 companies using our Template for
                  their product.
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            spacing={3}
            alignItems="center"
            justifyContent="center"
          >
            {items.map((item, index) => (
              <Grid item key={index}>
                <FadeInWhenVisible>
                  <Box
                    sx={{
                      '& img': {
                        transition:
                          'all 0.08s cubic-bezier(0.37, 0.24, 0.53, 0.99)',
                        filter: 'grayscale(1)',
                        opacity: 0.4,
                        cursor: 'pointer',
                      },
                      '&:hover img': { filter: 'grayscale(0)', opacity: 1 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.image}
                      sx={{ width: 'auto' }}
                    />
                  </Box>
                </FadeInWhenVisible>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
