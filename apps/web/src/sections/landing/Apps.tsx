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

const featureChat = '/assets/images/landing/chat.png';
const featureEcommerce = '/assets/images/landing/e-commerce.png';
const featureMail = '/assets/images/landing/mail.png';
const featureSocial = '/assets/images/landing/social.png';

const Technologies = [
  {
    image: featureChat,
    title: 'Chat',
    href: 'chat',
    description:
      'Power your web apps with the conceptual chat app of Able Pro Dashboard Template.',
  },
  {
    image: featureEcommerce,
    title: 'E-commerce',
    href: 'ecommerce',
    description:
      'Collection, Filter, Product Detail, Add New Product, and Checkout pages makes your e-commerce app complete.',
  },
  {
    image: featureMail,
    title: 'Inbox',
    href: 'mail',
    description:
      'Compose Message, List Message (email), Detailed Inbox pages well suited for any conversation based web apps.',
  },
  {
    image: featureSocial,
    title: 'User Management',
    href: 'social',
    description:
      'Detailed pages for User Management like Profile settings, role, account settings, social profile and more to explore.',
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
                  Working Conceptual Apps
                </Typography>
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography color="white">
                  Each App is carefully crafted to achieve the best feature rich
                  working concept for your project
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
                    {Technologies.map((tech, index) => (
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
                    {Technologies.map((tech, index) => (
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
