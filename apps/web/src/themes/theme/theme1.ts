// project-imports
import { ThemeMode } from 'config';

// types
import { PaletteThemeProps } from 'types/theme';

// ==============================|| PRESET THEME - THEME1 ||============================== //

export default function Theme1(mode: ThemeMode): PaletteThemeProps {
  const contrastText = '#fff';

  let primaryColors = [
    '#D6E4FF',
    '#D6E4FF',
    '#ADC8FF',
    '#84A9FF',
    '#6690FF',
    '#3366FF',
    '#254EDB',
    '#1939B7',
    '#102693',
    '#102693',
  ];
  let secondaryColors = [
    '#F8F9FA',
    '#F8F9FA',
    '#F3F5F7',
    '#DBE0E5',
    '#BEC8D0',
    '#8996A4',
    '#5B6B79',
    '#3E4853',
    '#1D2630',
    '#131920',
  ];
  let errorColors = ['#FFE7D3', '#FF805D', '#FF4528', '#DB271D', '#930C1A'];
  let warningColors = ['#FFF6D0', '#FFCF4E', '#FFB814', '#DB970E', '#935B06'];
  let infoColors = ['#DCF0FF', '#7EB9FF', '#549BFF', '#3D78DB', '#1A3D93'];
  let successColors = ['#EAFCD4', '#8AE65B', '#58D62A', '#3DB81E', '#137C0D'];

  if (mode === ThemeMode.DARK) {
    primaryColors = [
      '#1c2134',
      '#1f294d',
      '#243462',
      '#273e83',
      '#2c4db0',
      '#305bdd',
      '#567fe9',
      '#80a4f4',
      '#a9c5f8',
      '#d2e2fb',
    ];
    secondaryColors = [
      '#131920',
      '#1D2630',
      '#3E4853',
      '#5B6B79',
      '#8996A4',
      '#BEC8D0',
      '#DBE0E5',
      '#F3F5F7',
      '#F8F9FA',
      '#F8F9FA',
    ];
    errorColors = ['#341d1b', '#b03725', '#dd3f27', '#e9664d', '#fbd6c9'];
    warningColors = ['#342a1a', '#83631a', '#dda116', '#e9ba3a', '#fbefb5'];
    infoColors = ['#202734', '#416fb0', '#4c88dd', '#74a8e9', '#ecf4fb'];
    successColors = ['#1f2e1c', '#449626', '#4fba28', '#74cf4d', '#e3fbd2'];
  }

  return {
    primary: {
      lighter: primaryColors[0],
      100: primaryColors[1],
      200: primaryColors[2],
      light: primaryColors[3],
      400: primaryColors[4],
      main: primaryColors[5],
      dark: primaryColors[6],
      700: primaryColors[7],
      darker: primaryColors[8],
      900: primaryColors[9],
      contrastText,
    },
    secondary: {
      lighter: secondaryColors[0],
      100: secondaryColors[1],
      200: secondaryColors[2],
      light: secondaryColors[3],
      400: secondaryColors[4],
      500: secondaryColors[5]!,
      main: secondaryColors[6],
      dark: secondaryColors[7],
      800: secondaryColors[8],
      darker: secondaryColors[9],
      contrastText,
    },
    error: {
      lighter: errorColors[0],
      light: errorColors[1],
      main: errorColors[2],
      dark: errorColors[3],
      darker: errorColors[4],
      contrastText,
    },
    warning: {
      lighter: warningColors[0],
      light: warningColors[1],
      main: warningColors[2],
      dark: warningColors[3],
      darker: warningColors[4],
      contrastText: secondaryColors[5],
    },
    info: {
      lighter: infoColors[0],
      light: infoColors[1],
      main: infoColors[2],
      dark: infoColors[3],
      darker: infoColors[4],
      contrastText,
    },
    success: {
      lighter: successColors[0],
      light: successColors[1],
      main: successColors[2],
      dark: successColors[3],
      darker: successColors[4],
      contrastText,
    },
  };
}
