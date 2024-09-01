// material-ui
import Button, { ButtonProps } from '@mui/material/Button';

// ==============================|| AUTHENTICATION - CARD ||============================== //

export default function AuthSocButton({ children, ...other }: ButtonProps) {
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        bgcolor: 'secondary.100',
        borderColor: 'secondary.200',
        color: 'secondary.main',
        gap: '10px',
        '&:hover,&:focus': {
          bgcolor: 'secondary.100',
          borderColor: 'primary.main',
        },
      }}
      {...other}
    >
      {children}
    </Button>
  );
}
