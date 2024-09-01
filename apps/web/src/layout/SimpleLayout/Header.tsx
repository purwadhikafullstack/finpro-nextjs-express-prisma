'use client';

import { useState, cloneElement, ReactElement } from 'react';

// next
import Link from 'next/link';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Links from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';

// project-imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import Logo from 'components/logo';
import { ThemeDirection } from 'config';

// assets
import { ExportSquare, HambergerMenu, Minus } from 'iconsax-react';

interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

// elevation scroll
function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window : undefined,
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger
        ? alpha(theme.palette.background.default, 0.8)
        : alpha(theme.palette.background.default, 0.1),
    },
  });
}

// ==============================|| COMPONENTS - APP BAR ||============================== //

export default function Header() {
  const theme = useTheme();

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);

  const drawerToggler = (open: boolean) => (event: any) => {
    if (
      event.type! === 'keydown' &&
      (event.key! === 'Tab' || event.key! === 'Shift')
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
                target="_blank"
                underline="none"
              >
                Dashboard
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                component={Link}
                href="/components-overview/buttons"
                underline="none"
              >
                Components
              </Links>
              <Links
                className="header-link"
                color="secondary.main"
                href="/#"
                target="_blank"
                underline="none"
              >
                Documentation
              </Links>
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
                <Button
                  variant="contained"
                  color="success"
                  component={Link}
                  href={url}
                  sx={{ mt: 0.25 }}
                >
                  SIGN IN
                </Button>

                <IconButton
                  size="large"
                  color="secondary"
                  onClick={drawerToggler(true)}
                  sx={{ p: 1 }}
                >
                  <HambergerMenu />
                </IconButton>
              </Stack>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
                sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}
              >
                <Box
                  sx={{
                    width: 'auto',
                    '& .MuiListItemIcon-root': {
                      fontSize: '1rem',
                      minWidth: 32,
                    },
                  }}
                  role="presentation"
                  onKeyDown={drawerToggler(false)}
                >
                  <List>
                    <Links sx={linksSx} href="/#" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Dashboard"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Links>
                    <Links sx={linksSx} href="/#" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Documentation"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Links>
                    <Links sx={linksSx} href="/#" target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Support"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Links>
                    <Links sx={linksSx} href={url} target="_blank">
                      <ListItemButton>
                        <ListItemIcon>
                          <Minus color={theme.palette.secondary.main} />
                        </ListItemIcon>
                        <ListItemText
                          primary="SIGN IN"
                          primaryTypographyProps={{
                            variant: 'h6',
                            color: 'secondary.main',
                          }}
                        />
                      </ListItemButton>
                    </Links>
                  </List>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
}
