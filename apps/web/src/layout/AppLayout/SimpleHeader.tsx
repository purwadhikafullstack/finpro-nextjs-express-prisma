import React, { useEffect } from 'react';
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
import { ExportSquare } from 'iconsax-react';

// project imports
import AnimateButton from 'components/@extended/AnimateButton';
import Logo from 'components/logo';
import { useAppDispatch } from 'libs/hooks';
import { logout, loadUser } from 'libs/auth/authSlices';
import { isTokenExpired } from 'utils/authUtils/isTokenExpired';
import { refreshToken } from 'utils/authUtils/refreshToken';

// components
import ElevationScroll from 'components/header/ElevationScroll';
import HeaderMenu from 'components/header/HeaderMenu';
import Notification from 'components/header/Notification';

export default function SimpleHeader() {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { user, loginStatus } = useSelector((state: any) => state.auth);

  const avatarUrl = `http://localhost:8000/static/avatar/${user.avatarFilename}`;

  useEffect(() => {
    const accessToken = getCookie('access-token') as string;

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

  const url = '/login';

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
              justifyItems="center"
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
                <Logo reverse to="/" sx={{ paddingTop: 0 }} />
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
              </Stack>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
