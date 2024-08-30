import { ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import useConfig from 'hooks/useConfig';

// assets
const Caption = '/assets/images/customization/caption.svg';
const NoCaption = '/assets/images/customization/no-caption.svg';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

export default function MenuCaption() {
  const theme = useTheme();
  const { menuCaption, onChangeMenuCaption } = useConfig();

  const handleMenuCaptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChangeMenuCaption(event.target.value);
  };

  return (
    <RadioGroup
      row
      aria-label="payment-card"
      name="payment-card"
      value={menuCaption ? 'caption' : 'default'}
      onChange={handleMenuCaptionChange}
    >
      <Stack direction="row" alignItems="center" spacing={2.5} sx={{ width: '100%' }}>
        <FormControlLabel
          control={<Radio value="caption" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(menuCaption && { borderColor: theme.palette.primary.main }) }}>
                <CardMedia component="img" src={Caption} alt="Caption" />
              </MainCard>
              <Typography variant="caption">Show Caption</Typography>
            </Stack>
          }
        />
        <FormControlLabel
          control={<Radio value="default" sx={{ display: 'none' }} />}
          sx={{ width: '100%', m: 0, display: 'flex', '& .MuiFormControlLabel-label': { flex: 1 } }}
          label={
            <Stack alignItems="center" spacing={0.5}>
              <MainCard content={false} sx={{ borderWidth: 2, p: 1, ...(!menuCaption && { borderColor: theme.palette.primary.main }) }}>
                <CardMedia component="img" src={NoCaption} alt="NoCaption" />
              </MainCard>
              <Typography variant="caption">Hide Caption</Typography>
            </Stack>
          }
        />
      </Stack>
    </RadioGroup>
  );
}
