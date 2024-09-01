'use client';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import FormHelperText from '@mui/material/FormHelperText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';
import OtpInput from 'react-otp-input';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';

// ============================|| STATIC - CODE VERIFICATION ||============================ //

export default function AuthCodeVerification() {
  const theme = useTheme();

  return (
    <Formik
      initialValues={{ otp: '' }}
      validationSchema={Yup.object({
        otp: Yup.string()
          .length(4, 'OTP must be exactly 4 digits')
          .required('OTP is required'),
      })}
      onSubmit={(values, { resetForm }) => {
        resetForm();
        // reset focus after submission
        const activeElement = document.activeElement as HTMLElement | null;
        if (activeElement) activeElement.blur();
      }}
    >
      {({ errors, handleSubmit, touched, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box
                sx={{
                  '& input:focus-visible': {
                    outline: 'none !important',
                    borderColor: `${theme.palette.primary.main} !important`,
                    boxShadow: `${theme.customShadows.primary} !important`,
                  },
                }}
              >
                <OtpInput
                  value={values.otp}
                  onChange={(otp) => setFieldValue('otp', otp)}
                  inputType="tel"
                  shouldAutoFocus
                  renderInput={(props) => <input {...props} />}
                  numInputs={4}
                  containerStyle={{
                    justifyContent: 'space-between',
                    margin: -8,
                  }}
                  inputStyle={{
                    width: '100%',
                    margin: '8px',
                    padding: '10px',
                    border: '1px solid',
                    outline: 'none',
                    borderRadius: 4,
                    borderColor:
                      touched.otp && errors.otp
                        ? theme.palette.error.main
                        : theme.palette.divider,
                  }}
                />
                {touched.otp && errors.otp && (
                  <FormHelperText error id="standard-weight-helper-text-otp">
                    {errors.otp}
                  </FormHelperText>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Continue
                </Button>
              </AnimateButton>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                gap={2.5}
                justifyContent="space-between"
                alignItems="baseline"
              >
                <Typography>
                  Did not receive the email? Check your spam filter, or
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    minWidth: 85,
                    ml: 2,
                    textDecoration: 'none',
                    cursor: 'pointer',
                  }}
                  color="primary"
                >
                  Resend code
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
