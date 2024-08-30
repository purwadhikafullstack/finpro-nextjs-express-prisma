// material-ui
import { Theme } from '@mui/material/styles';

// ==============================|| OVERRIDES - TOOLTIP ||============================== //

export default function Tooltip(theme: Theme) {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: theme.palette.secondary.darker,
          color: theme.palette.background.paper
        }
      }
    }
  };
}
