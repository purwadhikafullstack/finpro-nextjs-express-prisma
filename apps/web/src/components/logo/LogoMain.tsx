// material-ui
import { useTheme } from '@mui/material/styles';

const logo = 'assets/images/logo.png';
import { ThemeMode } from 'config';

// ==============================|| LOGO SVG ||============================== //

export default function LogoMain({ reverse }: { reverse?: boolean }) {
  const theme = useTheme();
  return (
    <img
      src={theme.palette.mode === ThemeMode.DARK ? logo : logo}
      alt="icon logo"
      width="72"
    />
  );
}
