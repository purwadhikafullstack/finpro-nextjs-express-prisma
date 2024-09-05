// next
import Link from 'next/link';

// material-ui
import Links from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

export default function SimpleFooter() {
  return (
    <Box
      component="main"
      sx={{
        width: '100%',
        flexGrow: 1,
        p: { xs: 1, sm: 3 },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ p: '24px 16px 0px', mt: 'auto' }}
      >
        <Typography variant="caption">&copy; FINPRO-05</Typography>
        <Stack
          spacing={1.5}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Links
            component={Link}
            href="/"
            target="_blank"
            variant="caption"
            color="text.primary"
          >
            Home
          </Links>
          <Links
            component={Link}
            href="#"
            target="_blank"
            variant="caption"
            color="text.primary"
          >
            Documentation
          </Links>
          <Links
            component={Link}
            href="#"
            target="_blank"
            variant="caption"
            color="text.primary"
          >
            Support
          </Links>
        </Stack>
      </Stack>
    </Box>
  );
}
