// material-ui
import Box from '@mui/material/Box';

// project-imports
import MainCard, { MainCardProps } from 'components/MainCard';

// ==============================|| AUTHENTICATION - CARD ||============================== //

export default function AuthCard({ children, ...other }: MainCardProps) {
  return (
    <MainCard
      sx={{
        maxWidth: { xs: 400, md: 480 },
        margin: { xs: 2.5, md: 3 },
        '& > *': {
          flexGrow: 1,
          flexBasis: '50%',
        },
      }}
      content={false}
      {...other}
    >
      <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
    </MainCard>
  );
}
