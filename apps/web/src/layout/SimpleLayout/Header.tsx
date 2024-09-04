import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { useTheme, alpha } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import { getCookie } from 'cookies-next';
import Links from '@mui/material/Link';
import IconButton from 'components/@extended/IconButton';
import { ExportSquare, HambergerMenu } from 'iconsax-react';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import Logo from 'components/logo';
import { useAppDispatch } from 'libs/hooks';
import { logout, loadUser } from 'libs/auth/authSlices';
import { ThemeDirection } from 'config';
import { isTokenExpired } from 'utils/authUtils/isTokenExpired';
import { refreshToken } from 'utils/authUtils/refreshToken';

// components
import ElevationScroll from 'components/header/ElevationScroll';
import HeaderMenu from 'components/header/HeaderMenu';
import DrawerMenu from 'components/header/DrawerMenu';
import Notification from 'components/header/Notification';

export default function Header() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { user, loginStatus } = useSelector((state: any) => state.auth);

  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);

  const avatarUrl = `http://localhost:8000/static/avatar/${user.avatarFilename}`;

  useEffect(() => {
    const accessToken = getCookie('access-token') as string;
    console.log('Access Token on page load:', accessToken);

    if (accessToken) {
      if (isTokenExpired(accessToken)) {
        refreshToken().then((newToken) => {
          if (newToken) {
            dispatch(loadUser());
          } else {
            dispatch(logout());
          }
        });
      } else {
        dispatch(loadUser());
      }
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  const drawerToggler = (open: boolean) => (event: any) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerToggle(open);
  };

  const url = '/login';

  const linksSx = {
    textDecoration: 'none',
  };

  return (
    <ElevationScroll>
      <AppBar
        sx={{
          bgcolor: alpha(theme.palette.background.default, 0.1),
          backdropFilter: 'blur(8px)',
          color: theme.palette.text.primary,
          boxShadow: 'none',
        }}
      >
        <Container maxWidth="xl" disableGutters={matchDownMd}>
          <Toolbar
            sx={{ height: '64px', px: { xs: 1.5, sm: 4, md: 0, lg: 0 }, py: 0 }}
          >
            <Stack
              direction="row"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
              alignItems="center"
            >
              <Box sx={{ display: 'inline-block' }}>
                <Logo reverse to="/" />
              </Box>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              sx={{
                '& .header-link': {
                  fontWeight: 500,
                  '&:hover': { color: theme.palette.primary.main },
                },
                display: { xs: 'none', md: 'flex' },
              }}
              spacing={3}
            >
              <Links
                className="header-link"
                sx={{ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 }}
                color="secondary.main"
                component={Link}
                href="/#"
                underline="none"
                onClick={(e) => {
                  e.preventDefault();
                  const faqElement = document.getElementById('services');
                  if (faqElement) {
                    faqElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Our Services
              </Links>
              <Links
                className="header-link"
                sx={{ ml: theme.direction === ThemeDirection.RTL ? 3 : 0 }}
                color="secondary.main"
                component={Link}
                href="/#"
                target="_blank"
                underline="none"
              >
                Locations
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                component={Link}
                href="/#"
                underline="none"
              >
                FAQ
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                href="/#"
                target="_blank"
                underline="none"
              >
                Promotions
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                href="/#"
                target="_blank"
                underline="none"
              >
                Contact Us
              </Links>

              {loginStatus.isLogin ? (
                <>
                  <Notification />
                  <HeaderMenu user={user} avatarUrl={avatarUrl} />
                </>
              ) : (
                <Box sx={{ display: 'inline-block' }}>
                  <AnimateButton>
                    <Button
                      component={Links}
                      href={url}
                      target="_blank"
                      disableElevation
                      startIcon={<ExportSquare />}
                      color="success"
                      size="large"
                      variant="contained"
                    >
                      SIGN IN
                    </Button>
                  </AnimateButton>
                </Box>
              )}
            </Stack>
            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <Box sx={{ display: 'inline-block' }}>
                <Logo reverse to="/" sx={{ paddingTop: 1.5 }} />
              </Box>
              <Stack direction="row" spacing={2}>
                {loginStatus.isLogin ? (
                  <>
                    <Notification />
                    <HeaderMenu user={user} avatarUrl={avatarUrl} />
                  </>
                ) : (
                  <Button
                    variant="contained"
                    color="success"
                    component={Link}
                    href={url}
                    sx={{ mt: 0.25 }}
                  >
                    SIGN IN
                  </Button>
                )}

                <IconButton
                  size="large"
                  color="secondary"
                  onClick={drawerToggler(true)}
                  sx={{ p: 1 }}
                >
                  <HambergerMenu />
                </IconButton>
              </Stack>
              <DrawerMenu
                drawerToggle={drawerToggle}
                drawerToggler={drawerToggler}
                linksSx={linksSx}
                url={url}
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
