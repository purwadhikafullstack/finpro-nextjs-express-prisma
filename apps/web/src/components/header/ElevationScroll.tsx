// components/ElevationScroll.tsx

import { cloneElement, ReactElement } from 'react';
import { useTheme, alpha } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

export default function ElevationScroll({
  children,
  window,
}: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 10,
    target: window ? window : undefined,
  });

  return cloneElement(children, {
    style: {
      boxShadow: trigger ? '0 8px 6px -10px rgba(0, 0, 0, 0.5)' : 'none',
      backgroundColor: trigger
        ? alpha(theme.palette.background.default, 0.8)
        : alpha(theme.palette.background.default, 0.1),
    },
  });
}
