import { useMemo, useState } from 'react';
import { Sun1, Moon } from 'iconsax-react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Fab from '@mui/material/Fab';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// project-imports
import ThemeModeComponent from './ThemeMode';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import SimpleBar from 'components/third-party/SimpleBar';
import useConfig from 'hooks/useConfig';

// assets
import { Add } from 'iconsax-react';
import { HEADER_HEIGHT, ThemeMode } from 'config';

// ==============================|| HEADER CONTENT - CUSTOMIZATION ||============================== //

export default function Customization() {
  const theme = useTheme();
  const { mode, onChangeMode } = useConfig();

  const themeMode = useMemo(() => <ThemeModeComponent />, []);

  const [open, setOpen] = useState(false);

  // Function to toggle theme mode
  const toggleThemeMode = () => {
    const newMode: ThemeMode =
      mode === ThemeMode.LIGHT ? ThemeMode.DARK : ThemeMode.LIGHT;
    onChangeMode(newMode);
  };

  const currentIcon =
    mode === 'light' ? <Sun1 variant="Bold" /> : <Moon variant="Bold" />;

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Fab
        component="div"
        onClick={toggleThemeMode}
        size="large"
        variant="circular"
        sx={{
          borderRadius: 0,
          borderTopLeftRadius: '50%',
          borderBottomLeftRadius: '50%',
          borderTopRightRadius: '4px',
          borderBottomRightRadius: '4px',
          top: '14%',
          position: 'fixed',
          right: 0,
          zIndex: 1200,
          boxShadow: theme.customShadows.z1,
          bgcolor: 'background.paper',
          border: `4px solid ${theme.palette.background.paper}`,
          borderRight: 'none',
          '&:hover': {
            bgcolor: 'primary.lighter',
          },
        }}
      >
        <IconButton
          onClick={handleToggle}
          aria-label="settings toggler"
          size="large"
          sx={{
            p: 0,
            '& :hover': { bgcolor: 'red' },
            '& svg': { width: 28, height: 28 },
          }}
        >
          {currentIcon}
        </IconButton>
      </Fab>
      <Drawer
        sx={{ zIndex: 2001 }}
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 350,
          },
        }}
      >
        {open && (
          <MainCard content={false} border={false}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              spacing={1.5}
              sx={{ p: 2.5 }}
            >
              <Typography variant="h5">Settings</Typography>
              <IconButton
                color="error"
                sx={{
                  p: 0,
                  ':hover': {
                    color: theme.palette.error[100],
                  },
                }}
                onClick={handleToggle}
              >
                <Add size={28} style={{ transform: 'rotate(45deg)' }} />
              </IconButton>
            </Stack>
            <Box height="calc(100vh - 76px)">
              <SimpleBar
                sx={{
                  '& .simplebar-content': {
                    display: 'flex',
                    flexDirection: 'column',
                  },
                }}
              >
                <Box sx={{ p: 3, height: `calc(100vh - ${HEADER_HEIGHT}px)` }}>
                  <Grid container spacing={2.5}>
                    {/* theme-mode */}
                    <Grid item xs={12}>
                      <Stack>
                        <Typography variant="subtitle1" color="text.primary">
                          Theme Mode
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Choose light or dark mode
                        </Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      {themeMode}
                    </Grid>
                  </Grid>
                </Box>
              </SimpleBar>
            </Box>
          </MainCard>
        )}
      </Drawer>
    </>
  );
}
