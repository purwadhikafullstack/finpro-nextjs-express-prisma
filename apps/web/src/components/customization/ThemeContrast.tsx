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

// assets
import { Mask } from 'iconsax-react';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

export default function ThemeContrast() {
  const theme = useTheme();
  const { themeContrast, onChangeContrast } = useConfig();

  const handleContrastChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeContrast(event.target.value);
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={themeContrast ? 'contrast' : 'default'}
      onChange={handleContrastChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="contrast" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard
                content={false}
                sx={{ width: '100%', borderWidth: 2, p: 1, ...(themeContrast && { borderColor: theme.palette.primary.main }) }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 44 }}>
                  <Mask variant="Bold" />
                </Stack>
              </MainCard>
              <Typography variant="caption">Contrast</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Radio value="default" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard
                content={false}
                sx={{ width: '100%', borderWidth: 2, p: 1, ...(!themeContrast && { borderColor: theme.palette.primary.main }) }}
              >
                <Stack direction="row" alignItems="center" justifyContent="center" sx={{ height: 44 }}>
                  <Mask />
                </Stack>
              </MainCard>
              <Typography variant="caption">Shadow</Typography>
            </Stack>
          }
        />
      </Stack>
    </RadioGroup>
  );
}
