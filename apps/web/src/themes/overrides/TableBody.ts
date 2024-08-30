// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TABLE BODY ||============================== //

export default function TableBody(theme: Theme) {
  const hoverStyle = {
    '&:hover': {
      backgroundColor: theme.palette.secondary.lighter
    }
  };

  return {
    MuiTableBody: {
      styleOverrides: {
        root: {
          '&.striped .MuiTableRow-root': {
            '&:nth-of-type(even)': {
              backgroundColor: theme.palette.secondary.lighter
            },
            ...hoverStyle
          },
          '& .MuiTableRow-root': {
            ...hoverStyle
          }
        }
      }
    }
  };
}
