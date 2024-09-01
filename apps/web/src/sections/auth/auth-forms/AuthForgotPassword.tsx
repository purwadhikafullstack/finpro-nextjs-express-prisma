'use client';

// next
import { useRouter } from 'next/navigation';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';
import useUser from 'hooks/useUser';

// types
import { SnackbarProps } from 'types/snackbar';

// ============================|| FIREBASE - FORGOT PASSWORD ||============================ //

export default function AuthForgotPassword() {
  const scriptedRef = useScriptRef();
  const router = useRouter();
  const user = useUser();

  return (
    <Formik
      initialValues={{
        email: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          setStatus({ success: true });
          setSubmitting(false);
          openSnackbar({
            open: true,
            message: 'Check mail for reset password link',
            variant: 'alert',
            alert: {
              color: 'success',
            },
          } as SnackbarProps);
          setTimeout(() => {
            router.push(user ? '/auth/check-mail' : '/check-mail');
          }, 1500);
        } catch (err: any) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email-forgot">Email Address</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                  id="email-forgot"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter email address"
                  inputProps={{}}
                />
              </Stack>
              {touched.email && errors.email && (
                <FormHelperText error id="helper-text-email-forgot">
                  {errors.email}
                </FormHelperText>
              )}
            </Grid>
            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
            <Grid item xs={12} sx={{ mb: -2 }}>
              <Typography variant="caption">
                Do not forgot to check SPAM box.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <AnimateButton>
                <Button
                  disableElevation
                  disabled={isSubmitting}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  Send Password Reset Email
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
