import { CSSProperties } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  a11yDark,
  a11yLight,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';

// project-imports
import { ThemeMode } from 'config';

// ==============================|| CODE HIGHLIGHTER ||============================== //

export default function SyntaxHighlight({
  children,
  customStyle,
  ...others
}: {
  children: string;
  customStyle?: CSSProperties;
}) {
  const theme = useTheme();

  return (
    <SyntaxHighlighter
      language="javascript"
      showLineNumbers
      style={theme.palette.mode === ThemeMode.DARK ? a11yLight : a11yDark}
      customStyle={customStyle}
      {...others}
    >
      {children}
    </SyntaxHighlighter>
  );
}
