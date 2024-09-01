// next
import Image from 'next/image';

// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

// assets
const Google = '/assets/images/icons/google.svg';

// ==============================|| FIREBASE - SOCIAL BUTTON ||============================== //

export default function FirebaseSocial() {
  return (
    <Stack
      direction="row"
      spacing={{ xs: 1, sm: 2 }}
      justifyContent={{ xs: 'space-around', sm: 'space-between' }}
      sx={{
        '& .MuiButton-startIcon': {
          mr: { xs: 0, sm: 1 },
          ml: { xs: 0, sm: -0.5 },
        },
      }}
    >
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        startIcon={
          <Image
            src={Google}
            alt="Google"
            width={16}
            height={16}
            style={{ maxWidth: '100%', height: 'auto', marginRight: '8px' }}
          />
        }
      >
        Sign In With Google
      </Button>
    </Stack>
  );
}
