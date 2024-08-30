import { useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import { handlerDrawerOpen, useGetMenuMaster } from 'api/menu';
import { MenuOrientation, ThemeDirection } from 'config';

// assets
const defaultLayout = '/assets/images/customization/ltr.svg';
const rtlLayout = '/assets/images/customization/rtl.svg';
const miniMenu = '/assets/images/customization/mini-menu.svg';

// ==============================|| CUSTOMIZATION - LAYOUT ||============================== //

export default function ThemeLayout() {
  const theme = useTheme();
  const downLG = useMediaQuery(theme.breakpoints.down('lg'));

  const { miniDrawer, themeDirection, onChangeMiniDrawer, onChangeThemeLayout, menuOrientation } = useConfig();
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;

  let initialTheme = 'default';
  if (miniDrawer === true) initialTheme = 'mini';
  if (themeDirection === ThemeDirection.RTL) initialTheme = ThemeDirection.RTL;

  const [value, setValue] = useState<string | null>(initialTheme);
  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    switch (newValue) {
      case 'mini':
        onChangeMiniDrawer(true);
        if (drawerOpen) {
          handlerDrawerOpen(false);
        }
        break;
      case ThemeDirection.RTL:
        onChangeThemeLayout(ThemeDirection.RTL, false);
        if (!drawerOpen) {
          handlerDrawerOpen(true);
        }
        break;
      case 'default':
        onChangeThemeLayout(ThemeDirection.LTR, false);
        if (!drawerOpen) {
          handlerDrawerOpen(true);
        }
        break;
      default:
        handlerDrawerOpen(true);
        break;
    }
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={value} onChange={handleRadioChange}>
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="default" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard
                content={false}
                sx={{ borderWidth: 2, p: 1, ...(value === 'default' && { borderColor: theme.palette.primary.main }) }}
              >
                <CardMedia component="img" src={defaultLayout} alt="defaultLayout" />
              </MainCard>
              <Typography variant="caption">Default</Typography>
            </Stack>
          }
        />
        {(menuOrientation === MenuOrientation.VERTICAL || downLG) && (
          <FormControlLabel
            control={<Radio value="mini" sx={{ display: 'none' }} />}
            sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
            label={
              <Stack alignItems="center" spacing={0.5}>
                <MainCard
                  content={false}
                  sx={{ borderWidth: 2, p: 1, ...(value === 'mini' && { borderColor: theme.palette.primary.main }) }}
                >
                  <CardMedia component="img" src={miniMenu} alt="miniMenu" />
                </MainCard>
                <Typography variant="caption">Mini Drawer</Typography>
              </Stack>
            }
          />
        )}
        <FormControlLabel
          control={<Radio value={ThemeDirection.RTL} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard
                content={false}
                sx={{ borderWidth: 2, p: 1, ...(value === ThemeDirection.RTL && { borderColor: theme.palette.primary.main }) }}
              >
                <CardMedia component="img" src={rtlLayout} alt="rtlLayout" />
              </MainCard>
              <Typography variant="caption">RTL</Typography>
            </Stack>
          }
        />
      </Stack>
    </RadioGroup>
  );
}
