import {
  Stack,
  Grid,
  TextField,
  InputLabel,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Check as CheckIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { PatternFormat } from 'react-number-format';
import { useState } from 'react';

interface PersonalInfoProps {
  profile: any;
  onProfileChange: (field: string, value: string) => void;
  handleUpdateProfile: () => void;
  handleUpdateEmail: () => void; 
  isDisabled: boolean; 
}

const PersonalInfoForm = ({
  profile,
  onProfileChange,
  handleUpdateProfile,
  handleUpdateEmail, 
  isDisabled,
}: PersonalInfoProps) => {
  const [isEditingEmail, setIsEditingEmail] = useState(false); // Control email edit mode

  const handleEmailEditToggle = () => {
    setIsEditingEmail((prev) => !prev); // Toggle email edit mode
  };

  return (
    <Grid container spacing={3}>
      {/* First Name and Last Name */}
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel htmlFor="personal-first-name">
            <Typography fontWeight="bold">First Name</Typography>
          </InputLabel>
          <TextField
            fullWidth
            value={profile.first_name}
            onChange={(e) => onProfileChange('first_name', e.target.value)}
            id="personal-first-name"
            placeholder="First Name"
          />
        </Stack>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel htmlFor="personal-last-name">
            <Typography fontWeight="bold">Last Name</Typography>
          </InputLabel>
          <TextField
            fullWidth
            value={profile.last_name}
            onChange={(e) => onProfileChange('last_name', e.target.value)}
            id="personal-last-name"
            placeholder="Last Name"
          />
        </Stack>
      </Grid>

      {/* Phone Number */}
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel htmlFor="personal-phone">
            <Typography fontWeight="bold">Phone Number</Typography>
          </InputLabel>
          <PatternFormat
            format="+62 ### #### #####"
            fullWidth
            customInput={TextField}
            value={profile.phone_number}
            onChange={(e) => onProfileChange('phone_number', e.target.value)}
            placeholder="Phone Number"
          />
        </Stack>
      </Grid>

      {/* Email with Edit Mode */}
      <Grid item xs={12} sm={6}>
        <Stack spacing={1}>
          <InputLabel htmlFor="personal-email">
            <Typography fontWeight="bold">Email Address</Typography>
          </InputLabel>
          <TextField
            type="email"
            fullWidth
            value={profile.email}
            onChange={(e) => onProfileChange('email', e.target.value)}
            id="personal-email"
            placeholder="Email Address"
            disabled={!isEditingEmail} // Disable email field by default
            InputProps={{
              endAdornment: (
                <>
                  {isEditingEmail ? (
                    <>
                      <IconButton onClick={handleEmailEditToggle} color="error">
                        <CloseIcon />
                      </IconButton>
                      <IconButton onClick={handleUpdateEmail} color="primary">
                        <CheckIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton onClick={handleEmailEditToggle} color="primary">
                      <EditIcon />
                    </IconButton>
                  )}
                </>
              ),
            }}
          />
        </Stack>
      </Grid>

      {/* Button */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button
            variant="contained"
            onClick={handleUpdateProfile}
            disabled={isDisabled} // Disable button if no changes
          >
            Update Profile
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default PersonalInfoForm;
