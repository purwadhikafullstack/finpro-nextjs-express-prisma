'use client';

import { useEffect, useState, SyntheticEvent } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useUser from 'hooks/useUser';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';

import { openSnackbar } from 'api/snackbar';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// types
import { SnackbarProps } from 'types/snackbar';
import { StringColorProps } from 'types/password';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

// ============================|| FIREBASE - RESET PASSWORD ||============================ //

export default function AuthResetPassword() {
  const scriptedRef = useScriptRef();
  const router = useRouter();

  const user = useUser();

  const [level, setLevel] = useState<StringColorProps>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        password: '',
        confirmPassword: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string().max(255).required('Password is required'),
        confirmPassword: Yup.string()
          .required('Confirm Password is required')
          .test(
            'confirmPassword',
            'Both Password must be match!',
            (confirmPassword, yup) => yup.parent.password === confirmPassword,
          ),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          // password reset
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            openSnackbar({
              open: true,
              message: 'Successfuly reset password.',
              variant: 'alert',
              alert: {
                color: 'success',
              },
            } as SnackbarProps);
            setTimeout(() => {
              router.push(user ? '/auth/login' : '/login');
            }, 1500);
          }
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
                <InputLabel htmlFor="password-reset">Password</InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  id="password-reset"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="Enter password"
                />
              </Stack>
              {touched.password && errors.password && (
                <FormHelperText error id="helper-text-password-reset">
                  {errors.password}
                </FormHelperText>
              )}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      sx={{
                        bgcolor: level?.color,
                        width: 85,
                        height: 8,
                        borderRadius: '7px',
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="confirm-password-reset">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  fullWidth
                  error={Boolean(
                    touched.confirmPassword && errors.confirmPassword,
                  )}
                  id="confirm-password-reset"
                  type="password"
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter confirm password"
                />
              </Stack>
              {touched.confirmPassword && errors.confirmPassword && (
                <FormHelperText error id="helper-text-confirm-password-reset">
                  {errors.confirmPassword}
                </FormHelperText>
              )}
            </Grid>

            {errors.submit && (
              <Grid item xs={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}
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
                  Reset Password
                </Button>
              </AnimateButton>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
