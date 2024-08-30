import { ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';
import { ThemeMode } from 'config';

// assets
import { Moon, Setting2, Sun1 } from 'iconsax-react';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

export default function ThemeModeLayout() {
  const theme = useTheme();

  const { mode, onChangeMode } = useConfig();

  const handleModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeMode(event.target.value as ThemeMode);
  };

  return (
    <RadioGroup row aria-label="payment-card" name="payment-card" value={mode} onChange={handleModeChange}>
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value={ThemeMode.LIGHT} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard
                content={false}
                sx={{
                  width: '100%',
                  borderWidth: 2,
                  p: 1,
                  ...(mode === ThemeMode.LIGHT && { borderColor: theme.palette.primary.main })
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 44 }}>
                  <Sun1 variant="Bold" color={theme.palette.warning.main} />
                </Stack>
              </MainCard>
              <Typography variant="caption">Light</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Radio value={ThemeMode.DARK} sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard
                content={false}
                sx={{
                  width: '100%',
                  borderWidth: 2,
                  p: 1,
                  ...(mode === ThemeMode.DARK && { borderColor: theme.palette.primary.main })
                }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 44 }}>
                  <Moon variant="Bold" />
                </Stack>
              </MainCard>
              <Typography variant="caption">Dark</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Radio value={ThemeMode.AUTO} sx={{ display: 'none' }} />}
          sx={{ width: '100%', height: 60, m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard
                content={false}
                sx={{ width: '100%', borderWidth: 2, p: 1, ...(mode === ThemeMode.AUTO && { borderColor: theme.palette.primary.main }) }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 44 }}>
                  <Setting2 variant="Bold" />
                </Stack>
              </MainCard>
              <Typography variant="caption">Auto</Typography>
            </Stack>
          }
        />
      </Stack>
    </RadioGroup>
  );
}
