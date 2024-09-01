// material-ui
import { styled, useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { motion } from 'framer-motion';

// project-imports
import Logo from 'components/logo';

// assets
import { Facebook, Link2, Youtube, Xrp } from 'iconsax-react';

// link - custom style
const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.primary,
  '&:hover, &:active': {
    color: theme.palette.primary.main,
  },
}));

type showProps = {
  isFull?: boolean;
};

// ==============================|| LANDING - FOOTER PAGE ||============================== //

export default function FooterBlock({ isFull }: showProps) {
  const theme = useTheme();

  const linkSX = {
    color: theme.palette.text.secondary,
    fontWeight: 400,
    opacity: '0.6',
    cursor: 'pointer',
    '&:hover': {
      opacity: '1',
    },
  };

  return (
    <>
      <Box
        sx={{
          pt: isFull ? 5 : 10,
          pb: 10,
          bgcolor: 'secondary.200',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Logo to="/" />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 400, maxWidth: 320 }}
                    >
                      LaundryXpert is trusted by thousands for delivering
                      reliable and high-quality laundry services. Our dedicated
                      team ensures your clothes are treated with the utmost
                      care, providing fresh, clean results every time.
                    </Typography>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={{ xs: 5, md: 2 }}>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Company</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Profile
                      </FooterLink>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Career
                      </FooterLink>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Follow Us
                      </FooterLink>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Website
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Help & Support</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Customer Service
                      </FooterLink>
                      <FooterLink href="/#" target="_blank" underline="none">
                        FAQ
                      </FooterLink>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Support
                      </FooterLink>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Email Us
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={6} sm={4}>
                  <Stack spacing={3}>
                    <Typography variant="h5">Terms & Conditions</Typography>
                    <Stack spacing={{ xs: 1.5, md: 2.5 }}>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Support Policy
                      </FooterLink>
                      <FooterLink href="/#" target="_blank" underline="none">
                        Licenses Term
                      </FooterLink>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box
        sx={{
          py: 2.4,
          borderTop: `1px solid ${theme.palette.divider}`,
          bgcolor: 'secondary.200',
        }}
      >
        <Container>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <Typography>
                © Handcrafted by Team{' '}
                <Link href="/#" underline="none">
                  {' '}
                  FINPRO-05
                </Link>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                sx={{ justifyContent: 'flex-end' }}
              >
                <Grid item>
                  <Tooltip title="Linkedin">
                    <Link
                      href="/#"
                      underline="none"
                      target="_blank"
                      sx={linkSX}
                    >
                      <Link2 variant="Bold" size={24} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Twitter">
                    <Link
                      href="/#"
                      underline="none"
                      target="_blank"
                      sx={linkSX}
                    >
                      <Xrp variant="Bold" size={16} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Facebook">
                    <Link
                      href="/#"
                      underline="none"
                      target="_blank"
                      sx={linkSX}
                    >
                      <Facebook variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
                <Grid item>
                  <Tooltip title="Youtube">
                    <Link
                      href="/#"
                      underline="none"
                      target="_blank"
                      sx={linkSX}
                    >
                      <Youtube variant="Bold" size={20} />
                    </Link>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
