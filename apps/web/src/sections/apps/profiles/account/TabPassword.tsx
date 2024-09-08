import { useState, SyntheticEvent } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import ConfirmModal from 'components/modal/ConfirmModal';
import instance from 'utils/axiosIntance';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

// ==============================|| ACCOUNT PROFILE - PASSWORD CHANGE ||============================== //

export default function TabPassword() {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>(
    'success',
  );
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [tempSubmit, setTempSubmit] = useState<(() => void) | null>(null);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleClickShowOldPassword = () => {
    setShowOldPassword(!showOldPassword);
  };
  const handleClickShowNewPassword = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };

  const handleOpenConfirm = (submitForm: () => void) => {
    setTempSubmit(() => submitForm);
    setConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    setConfirmOpen(false);
    setTempSubmit(null); // Reset the submit function after confirmation is closed
  };

  return (
    <>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        style={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid item xs={12} md={6}>
          <MainCard title="Change Password">
            <Formik
              initialValues={{
                old: '',
                password: '',
                confirm: '',
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                old: Yup.string().required('Old Password is required'),
                password: Yup.string().required('New Password is required'),
                confirm: Yup.string()
                  .required('Confirm Password is required')
                  .test(
                    'confirm',
                    `Passwords don't match.`,
                    (confirm: string, yup: any) =>
                      yup.parent.password === confirm,
                  ),
              })}
              onSubmit={async (
                values,
                { resetForm, setErrors, setStatus, setSubmitting },
              ) => {
                try {
                  await instance().post(
                    'http://localhost:8000/api/auth/change-password',
                    {
                      oldPassword: values.old,
                      newPassword: values.password,
                    },
                  );

                  setSnackbarMessage('Password changed successfully.');
                  setSnackbarSeverity('success');
                  setSnackbarOpen(true);

                  resetForm();
                  setStatus({ success: true });
                  setSubmitting(false);
                  handleCloseConfirm();
                } catch (err: any) {
                  setStatus({ success: false });

                  // Tampilkan pesan error di snackbar
                  setSnackbarMessage(
                    err.response?.data?.message || 'Failed to change password.',
                  );
                  setSnackbarSeverity('error');
                  setSnackbarOpen(true);

                  setErrors({
                    submit: err.response?.data?.message || err.message,
                  });
                  setSubmitting(false);

                  handleCloseConfirm();
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
                submitForm,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-old">
                          Old Password
                        </InputLabel>
                        <OutlinedInput
                          id="password-old"
                          placeholder="Enter Old Password"
                          type={showOldPassword ? 'text' : 'password'}
                          value={values.old}
                          name="old"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowOldPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                                color="secondary"
                              >
                                {showOldPassword ? <Eye /> : <EyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          }
                          autoComplete="password-old"
                        />
                      </Stack>
                      {touched.old && errors.old && (
                        <FormHelperText error id="password-old-helper">
                          {errors.old}
                        </FormHelperText>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-password">
                          New Password
                        </InputLabel>
                        <OutlinedInput
                          id="password-password"
                          placeholder="Enter New Password"
                          type={showNewPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowNewPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                                color="secondary"
                              >
                                {showNewPassword ? <Eye /> : <EyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          }
                          autoComplete="password-password"
                        />
                      </Stack>
                      {touched.password && errors.password && (
                        <FormHelperText error id="password-password-helper">
                          {errors.password}
                        </FormHelperText>
                      )}
                    </Grid>

                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="password-confirm">
                          Confirm Password
                        </InputLabel>
                        <OutlinedInput
                          id="password-confirm"
                          placeholder="Enter Confirm Password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={values.confirm}
                          name="confirm"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                size="large"
                                color="secondary"
                              >
                                {showConfirmPassword ? <Eye /> : <EyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          }
                          autoComplete="password-confirm"
                        />
                      </Stack>
                      {touched.confirm && errors.confirm && (
                        <FormHelperText error id="password-confirm-helper">
                          {errors.confirm}
                        </FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={2}
                      >
                        <Button
                          disabled={
                            isSubmitting ||
                            Object.keys(errors).length !== 0 ||
                            !values.old ||
                            !values.password ||
                            !values.confirm
                          }
                          variant="contained"
                          onClick={() => handleOpenConfirm(submitForm)}
                        >
                          Change Password
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </form>
              )}
            </Formik>
          </MainCard>
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Modal */}
      <ConfirmModal
        open={confirmOpen}
        onClose={handleCloseConfirm}
        onConfirm={tempSubmit || handleCloseConfirm} // Call Formik submit function if confirmed
        title="Confirm Password Change"
        message="Are you sure you want to change your password?"
        confirmText="Yes, Change Password"
        cancelText="Cancel"
      />
    </>
  );
}
