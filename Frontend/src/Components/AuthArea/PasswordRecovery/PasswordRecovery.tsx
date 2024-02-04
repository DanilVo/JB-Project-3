import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import PasswordRecoveryModel from '../../../Models/PasswordRecoveryModel';
import notificationService from '../../../Services/NotificationService';
import authService from '../../../Services/AuthService';

export default function PasswordRecovery(): JSX.Element {
  const navigate = useNavigate();

  const { register, handleSubmit, watch } = useForm<PasswordRecoveryModel>();

  async function setNewPassword(credentials: PasswordRecoveryModel) {
    try {
      if (watch('password') !== watch('verifyPassword')) {
        notificationService.error('Passwords doesn`t match!');
        return;
      }
      credentials = {
        ...credentials,
        email: atob(localStorage.getItem('verifyUser')),
      };
      const response = await authService.setNewPassword(credentials);
      console.log(response);

      notificationService.success('Password has been successfully updated');
      navigate('/auth/login');
    } catch (err: any) {
      notificationService.error(err.message);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Password recovery
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(setNewPassword)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="New password"
                name="password"
                type="password"
                {...register('password')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="verifyPassword"
                label="Verify password"
                type="password"
                {...register('verifyPassword')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Update Password
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/auth/login">Back to Sign in</NavLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        sx={{ mt: 2 }}
      >
        {`Copyright © Trip Blitz ${new Date().getFullYear()}.`}
      </Typography>
    </Container>
  );
}
