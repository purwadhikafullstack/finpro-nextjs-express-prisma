'use client';

import { useRef, useState } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import FadeInWhenVisible from './Animation';
import { ThemeDirection } from 'config';

// third-party
import Slider, { Settings } from 'react-slick';

const servicesAndSchedule = '/assets/images/landing/step-01.png';
const pickUp = '/assets/images/landing/step-02.png';
const invoice = '/assets/images/landing/step-03.png';
const delivery = '/assets/images/landing/step-04.png';

const Steps = [
  {
    image: servicesAndSchedule,
    title: '01. Select Services and Schedule',
    href: 'chat',
    description:
      'Our priority is to make it easy for you to access to our services. Schedule for service, pick-up and delivery anytime, anywhere! ',
  },
  {
    image: pickUp,
    title: '02. Prepare for Pick-up',
    href: 'ecommerce',
    description:
      'Make sure that the clothes that you want to do laundry are collected in one container at the time of pickup by our courier. That will help your clothes not to be scattered and left behind at the time of pickup.',
  },
  {
    image: invoice,
    title: '03. Detailed Itemization and Invoice',
    href: '/',
    description:
      'We will immediately process your order and provide invoice via WhatApp service. You can confirm and make Payment via M-Banking, Qris, Virtual Account, and E-Wallet',
  },
  {
    image: delivery,
    title: '04. Freshly Cleaned Delivery',
    href: 'social',
    description:
      'We will make the delivery according to the schedule you requested! No need to worry about being late, we guarantee punctuality of delivery. You can enjoy your perfectly clean clothes the way you want!',
  },
];
// ==============================|| LANDING - APPS PAGE ||============================== //

export default function AppsPage() {
  const theme = useTheme();
  const [slideIndex, setSlideIndex] = useState<number>(0);

  function handleChange(value: number) {
    goToSlide(value);
    setSlideIndex(value);
  }

  const [state, setState] = useState(0);
  const sliderRef = useRef<Slider>(null);

  const goToSlide = (index: number) => {
    setState(index);
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  const settings: Settings = {
    autoplay: true,
    fade: true,
    dots: false,
    arrows: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: function (currentSlide: number, next: number) {
      setSlideIndex(next);
    },
  };

  return (
    <Box
      id="howItWorks"
      sx={{
        bgcolor: theme.palette.primary.main,
        overflow: 'hidden',
        pt: { md: 10, xs: 5 },
      }}
    >
      <Container>
        <Grid container spacing={3} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              sx={{ textAlign: 'center', marginBottom: 3 }}
            >
              <Grid item xs={12}>
                <Typography variant="h2" color="white">
                  How it works
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="white">
                  Book Your Laundry Delivery in 4 Simple Steps
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Container>
        <Grid
          container
          spacing={3}
          alignItems="center"
          justifyContent="center"
          sx={{ pt: { md: 10, xs: 2.5 } }}
        >
          <Grid item xs={12}>
            <Grid container spacing={3} alignItems="start">
              <Grid item xs={12} md={6}>
                <Box pb={{ xs: 0, md: 10 }}>
                  <Grid container spacing={1.5} alignItems="center">
                    {Steps.map((tech, index) => (
                      <Grid item xs={12} key={index}>
                        <FadeInWhenVisible>
                          <Button
                            onClick={() => {
                              handleChange(index);
                            }}
                            role="link"
                            href={`#${tech.href}`}
                            sx={{
                              p: 3,
                              borderRadius: 1.5,
                              ...(slideIndex === index && {
                                background: alpha(
                                  theme.palette.secondary.lighter,
                                  0.13,
                                ),
                                boxShadow: theme.customShadows.z1,
                                '&:hover': {
                                  background: alpha(
                                    theme.palette.secondary.lighter,
                                    0.13,
                                  ),
                                  boxShadow: theme.customShadows.z1,
                                },
                              }),
                            }}
                            variant="light"
                          >
                            <Grid container textAlign="start" spacing={2}>
                              <Grid item xs={12}>
                                <Typography variant="h4" color="white">
                                  {tech.title}
                                </Typography>
                              </Grid>
                              <Grid item xs={12}>
                                <Typography color="white">
                                  {tech.description}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Button>
                        </FadeInWhenVisible>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    transform: 'scale(1.56)',
                    transformOrigin: 'top left',
                    mt: 3,
                    width: '100%',
                    pointerEvents: 'none',
                    ...(theme.direction === ThemeDirection.RTL && {
                      '& .slick-slider > .slick-list > .slick-track > .slick-slide':
                        { float: 'right !important' },
                    }),
                  }}
                >
                  <Slider ref={sliderRef} {...settings}>
                    {Steps.map((tech, index) => (
                      <Box key={index + state}>
                        <CardMedia
                          component="img"
                          image={tech.image}
                          sx={{ width: '100%', minHeight: '100%' }}
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
