'use client';

// material-ui
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';
import Marquee from 'react-fast-marquee';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';

// assets
import Avatar from 'components/@extended/Avatar';
const Avatar1 = '/assets/images/users/avatar-6.png';
const Avatar2 = '/assets/images/users/avatar-1.png';
const Avatar3 = '/assets/images/users/avatar-2.png';
const Avatar4 = '/assets/images/users/avatar-3.png';
const Avatar5 = '/assets/images/users/avatar-4.png';
const Avatar6 = '/assets/images/users/avatar-5.png';
const Avatar7 = '/assets/images/users/avatar-7.png';
const Avatar8 = '/assets/images/users/avatar-8.png';

// ================================|| SLIDER - ITEMS ||================================ //

function Item({
  item,
}: {
  item: {
    image: string;
    text: string;
    name: string;
    designation: string;
    highlight?: boolean;
  };
}) {
  return (
    <MainCard
      sx={{
        width: { xs: '300px', md: '420px' },
        cursor: 'pointer',
        my: 0.2,
        mx: 1.5,
      }}
    >
      <Stack direction="row" alignItems="flex-start" spacing={2}>
        <Avatar alt="Avatar" size="lg" src={item.image}></Avatar>
        <Stack>
          <Typography>{item.text}</Typography>
          <Typography>
            <small>{item.name}</small> -{' '}
            <Box component="span" color="text.secondary">
              {item.designation}
            </Box>
          </Typography>
        </Stack>
      </Stack>
    </MainCard>
  );
}

// ==============================|| LANDING - TESTIMONIAL PAGE ||============================== //

export default function TestimonialPage() {
  const testimonials = [
    {
      image: Avatar1,
      text: '“LaundryXpert has transformed my laundry experience. The service is quick, and my clothes have never been cleaner! 💎“',
      name: 'Aisha Putri',
      designation: 'Customer Experience',
    },
    {
      image: Avatar2,
      text: '“The convenience of LaundryXpert is unmatched. I can book a pickup with just a few clicks, and their customer service is top-notch.😍“',
      name: 'Budi Santoso',
      designation: 'Ease of Use',
    },
    {
      image: Avatar3,
      text: '“As a busy professional, LaundryXpert saves me so much time. The quality of their work is superb. 😍“',
      name: 'Citra Anggraini',
      designation: 'Time Saver',
    },
    {
      image: Avatar4,
      text: '“I love how my clothes come back fresh and well-ironed every time. The attention to detail is fantastic!“',
      name: 'Dedi Pratama',
      designation: 'Quality of Service',
    },
    {
      image: Avatar5,
      text: '“The subscription plan is perfect for my family. We never have to worry about laundry again! 😍“',
      name: 'Erika Salim',
      designation: 'Value for Money',
    },
    {
      image: Avatar6,
      text: '“LaundryXpert is a game-changer. The pickup and delivery are always on time, and the prices are reasonable. 💎“',
      name: 'Farhan Iskandar',
      designation: 'Reliability',
    },
    {
      image: Avatar7,
      text: '“The app is easy to use, and the service is reliable. LaundryXpert has made my life so much easier.😍“',
      name: 'Gita Mahendra',
      designation: 'App Usability',
    },
    {
      image: Avatar8,
      text: '“LaundryXpert exceeded my expectations. My clothes are always perfectly cleaned and handled with care. 💎“',
      name: 'Hendra Wijaya',
      designation: 'Attention to Detail',
    },
  ];
  return (
    <>
      <Box sx={{ mt: { md: 15, xs: 2.5 } }}>
        <Container>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ textAlign: 'center', marginBottom: 4 }}
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
                  They{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    love{' '}
                  </Box>{' '}
                  LaundryXpert, Now your turn 😍
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
                  Our customers trust LaundryXpert for exceptional service and
                  convenience. Rated 4.6/5 by satisfied clients, we’re proud to
                  be their go-to for all laundry needs. Join them and experience
                  the difference today!”
                </Typography>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box sx={{ mb: { md: 10, xs: 2.5 } }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <FadeInWhenVisible>
              <Marquee pauseOnHover gradient={false}>
                {testimonials.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </Marquee>
            </FadeInWhenVisible>
          </Grid>
          <Grid item xs={12}>
            <FadeInWhenVisible>
              <Marquee pauseOnHover direction="right" gradient={false}>
                {testimonials.map((item, index) => (
                  <Item key={index} item={item} />
                ))}
              </Marquee>
            </FadeInWhenVisible>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
