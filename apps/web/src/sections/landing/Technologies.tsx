'use client';

// next
import Link from 'next/link';

// material-ui
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Links from '@mui/material/Link';
import Container from '@mui/material/Container';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// third-party
import { motion } from 'framer-motion';

// project-imports
import FadeInWhenVisible from './Animation';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { DocumentDownload, ExportSquare } from 'iconsax-react';
const techBootstrap = '/assets/images/landing/tech-bootstrap.svg';
const techMui = '/assets/images/landing/tech-mui.svg';
const techCodeigniter = '/assets/images/landing/tech-codeigniter.svg';
const techNet = '/assets/images/landing/tech-net.svg';
const techFigma = '/assets/images/landing/tech-figma.svg';
const techAngular = '/assets/images/landing/tech-angular.svg';
const techVue = '/assets/images/landing/tech-vuetify.svg';
const techNextJS = '/assets/images/landing/tech-nextjs.svg';
const techVuelaravel = 'assets/images/landing/tech-l+v.svg';
const techLaravelBootstrap = 'assets/images/landing/tech-Laravel+Bootstrap.svg';
const techDjango = 'assets/images/landing/tech-Django.svg';
const techFlask = 'assets/images/landing/tech-Flask.svg';
const techNodeJs = 'assets/images/landing/tech-Node-js.svg';
const techSvelteKit = 'assets/images/landing/tech-SvelteKit.svg';

let value: string = window.location.search;
const params = new URLSearchParams(value);
const ispValue = params.get('isp');

const Technologies = [
  {
    trending: false,
    icon: techBootstrap,
    title: 'Bootstrap 5',
    description:
      'Able Pro Bootstrap 5 - the top choice for responsive, mobile-first design, you can achieve both professional functionality and visual appeal.',
    preview: 'https://ableproadmin.com/dashboard/index.html',
    free: 'https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template',
    target: '_blank',
  },
  {
    trending: true,
    icon: techMui,
    title: 'React Material-UI',
    description:
      'Able Pro React dashboard template is a powerful tool that utilizes the Material-UI component library to create stunning and intuitive user interfaces.',
    preview: 'https://ableproadmin.com/react/dashboard/default',
    free: 'https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template',
    target: '_blank',
  },
  {
    trending: false,
    icon: techAngular,
    title: 'Angular',
    description:
      'Able Pro Angular dashboard template is a powerful tool that utilizes the Google Material component library to create stunning and intuitive user interfaces.',
    preview: 'https://ableproadmin.com/angular/default/dashboard/default',
    free: 'https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template',
    target: '_blank',
  },
  {
    trending: false,
    icon: techVue,
    title: 'Vue',
    description:
      'Able Pro Vue stands out as a versatile and powerful - Vue with Vuetify dashboard combines modern design principles with robust functionality.',
    preview: 'https://ableproadmin.com/vue/dashboard/default',
    free: null,
    target: '_blank',
  },
  {
    trending: false,
    icon: techNextJS,
    title: 'Next Js',
    description:
      'Able Pro Next Js dashboard template is a powerful tool that utilizes the Material-UI component library to create stunning and intuitive user interfaces.',
    preview: '/login',
    free: null,
    target: '_blank',
  },
  {
    trending: false,
    icon: techNet,
    title: 'Asp.net',
    description:
      'Able Pro .NET version is a robust dashboard template designed specifically for .NET developers. Its comes with a wide range of pre-built components.',
    preview: 'https://able-pro.azurewebsites.net/Dashboard/Index',
    free: 'https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template',
    target: '_blank',
  },
  {
    trending: false,
    icon: techCodeigniter,
    title: 'CodeIgniter',
    description:
      'Able Pro CodeIgniter version is a powerful dashboard template built specifically for developers who use the CodeIgniter PHP framework with Bootstrap.',
    preview:
      'https://ableproadmin.com/codeigniter/default/public/dashboard-default',
    free: 'https://github.com/phoenixcoded/able-pro-free-admin-dashboard-template',
    target: '_blank',
  },
  {
    trending: false,
    icon: techVuelaravel,
    title: 'Vuetify Laravel',
    description:
      'Able Pro Vue stands out as a versatile and powerful - Vue with Vuetify dashboard combines modern design principles with robust functionality.',
    preview:
      'https://phplaravel-207002-4524103.cloudwaysapps.com/build/dashboards/default',
    free: null,
    target: '_blank',
  },
  {
    trending: false,
    icon: techLaravelBootstrap,
    title: 'Laravel Bootstrap',
    description:
      'Able Pro Laravel with Bootstrap provides a powerful set of tools and components, crafted specifically for Laravel, to simplify and accelerate your development process.',
    preview: '#!',
    free: null,
    target: '_self',
  },
  {
    trending: false,
    icon: techDjango,
    title: 'Django',
    description:
      'Able Pro Django is a powerful dashboard template designed for developers. it offers an extensive collection of pre-built components for seamless web development.',
    preview: '#!',
    free: null,
    target: '_self',
  },
  {
    trending: false,
    icon: techFlask,
    title: 'Flask',
    description:
      'Able Pro Flask is a versatile dashboard solution that offers a rich set of pre-built components to simplify web development.',
    preview: '#!',
    free: null,
    target: '_self',
  },
  {
    trending: false,
    icon: techNodeJs,
    title: 'NodeJs',
    description:
      'Able Pro Node.js combines flexibility and functionality with a variety of pre-built components tailored for Node.js, which make it easier to develop.',
    preview: '#!',
    free: null,
    target: '_self',
  },
  {
    trending: false,
    icon: techSvelteKit,
    title: 'Svelte',
    description:
      'Able Pro Svelte provides an extensive toolkit and components, allowing you to build dynamic and responsive interfaces with ease and efficiency.',
    preview: '#!',
    free: null,
    target: '_self',
  },
  {
    trending: false,
    icon: techVuelaravel,
    title: 'Vue+Laravel',
    description:
      'Able Pro Vue+Laravel version is a powerful dashboard template built specifically for developers who use the Vue+Laravel framework.',
    preview:
      ispValue !== null && parseInt(ispValue) === 1
        ? 'https://phplaravel-207002-4524103.cloudwaysapps.com/build/pages/landing?isp=1'
        : 'https://phplaravel-207002-4524103.cloudwaysapps.com/build/pages/landing ',
    free: null,
  },
  {
    trending: false,
    icon: techFigma,
    title: 'Figma',
    description:
      'Able Pro comes with a Figma design file that allows you to customize and fine-tune your dashboard to meet your specific needs.',
    preview:
      'https://www.figma.com/file/6XqmRhRmkr33w0EFD49acY/Able-Pro--v9.0-Figma-Preview?type=design&mode=design&t=4FS2Lw6WxsmJ3RLm-0',
    free: null,
    target: '_blank',
  },
];

// ==============================|| LANDING - TECHNOLOGIES PAGE ||============================== //

export default function TechnologiesPage() {
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
                <Typography variant="h2">Available Technologies</Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
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
                  Explore the Demos of Able Pro in multiple technologies.
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
            {Technologies.map((tech, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <FadeInWhenVisible>
                  <MainCard>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        {tech.trending && (
                          <Badge
                            badgeContent="TRENDING"
                            color="error"
                            variant="light"
                          >
                            <CardMedia
                              component="img"
                              image={tech.icon}
                              sx={{ width: 'auto' }}
                            />
                          </Badge>
                        )}
                        {!tech.trending && (
                          <CardMedia
                            component="img"
                            image={tech.icon}
                            sx={{ width: 'auto' }}
                          />
                        )}
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="h4">{tech.title}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{tech.description}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={2} justifyContent="flex-start">
                          <Grid item>
                            <Button
                              variant="contained"
                              color="secondary"
                              size="large"
                              startIcon={<ExportSquare />}
                              component={Link}
                              href={
                                ispValue !== null && parseInt(ispValue) === 1
                                  ? `${tech.preview}?isp=1`
                                  : tech.preview
                              }
                              target={tech.target}
                              sx={{
                                fontWeight: 500,
                                bgcolor: 'secondary.light',
                                color: 'secondary.darker',
                                '&:hover': { color: 'secondary.lighter' },
                              }}
                            >
                              Reference
                            </Button>
                          </Grid>
                          {!(tech.free == null) && (
                            <Grid item>
                              <Links component={Link} href={tech.preview}>
                                <IconButton
                                  size="large"
                                  shape="rounded"
                                  color="secondary"
                                  sx={{
                                    bgcolor: 'secondary.lighter',
                                    color: 'secondary.darker',
                                    '&:hover': {
                                      color: 'secondary.lighter',
                                      bgcolor: 'secondary.darker',
                                    },
                                  }}
                                >
                                  <DocumentDownload />
                                </IconButton>
                              </Links>
                            </Grid>
                          )}
                        </Grid>
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
