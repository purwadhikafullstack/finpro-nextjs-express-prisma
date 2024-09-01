// next
import Link from 'next/link';

// material-ui
import ButtonBase from '@mui/material/ButtonBase';
import { SxProps } from '@mui/system';

// third-party
import { To } from 'history';

// project-imports
import Logo from './LogoMain';
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| MAIN LOGO ||============================== //

interface Props {
  reverse?: boolean;
  isIcon?: boolean;
  sx?: SxProps;
  to?: To;
}

export default function LogoSection({ reverse, isIcon, sx, to }: Props) {
  return (
    <ButtonBase
      disableRipple
      component={Link}
      href={!to ? APP_DEFAULT_PATH : to}
      sx={sx}
    >
      {isIcon ? <Logo /> : <Logo reverse={reverse} />}
    </ButtonBase>
  );
}
