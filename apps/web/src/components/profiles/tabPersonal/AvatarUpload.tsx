import { ChangeEvent } from 'react';
import { Box, Stack, FormLabel, TextField, Typography } from '@mui/material';
import { Camera } from 'iconsax-react';
import Avatar from 'components/@extended/Avatar';
import { useTheme } from '@mui/material/styles';
import { ThemeMode } from 'config';
import { useAppSelector } from 'libs/hooks';

interface AvatarUploadProps {
  avatar: string;
  onImageChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const AvatarUpload = ({ avatar, onImageChange }: AvatarUploadProps) => {
  const theme = useTheme();
  const { user } = useAppSelector((state: any) => state.auth);

  return (
    <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
      <FormLabel
        htmlFor="change-avatar"
        sx={{
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          '&:hover .MuiBox-root': { opacity: 1 },
          cursor: 'pointer',
        }}
      >
        <Avatar
          alt={user.firstName}
          src={avatar}
          sx={{ width: 76, height: 76 }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor:
              theme.palette.mode === ThemeMode.DARK
                ? 'rgba(255, 255, 255, .75)'
                : 'rgba(0,0,0,.65)',
            width: '100%',
            height: '100%',
            opacity: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack spacing={0.5} alignItems="center">
            <Camera
              style={{
                color: theme.palette.secondary.lighter,
                fontSize: '1.5rem',
              }}
            />
            <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
              Upload
            </Typography>
          </Stack>
        </Box>
      </FormLabel>
      <TextField
        type="file"
        id="change-avatar"
        placeholder="Outlined"
        variant="outlined"
        sx={{ display: 'none' }}
        onChange={onImageChange}
      />
    </Stack>
  );
};

export default AvatarUpload;
