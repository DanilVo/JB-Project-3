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
import UserModel from '../../../Models/UserModel';
import authService from '../../../Services/AuthService';
import notificationService from '../../../Services/NotificationService';
import useTitle from '../../../Utils/useTitle';

interface Props {
  setUserInSystem: Function;
}
interface ErrorMessages {
  [key: string]: string;
}
export default function Register(props: Props): JSX.Element {
  useTitle('Register');
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function registerNewUser(credentials: UserModel) {
    try {
      await authService.register(credentials);
      notificationService.success('User has been successfully created');
      props.setUserInSystem(true);
      navigate('/home');
    } catch (err: any) {
      const errorMessages: ErrorMessages = {
        firstName: 'Missing first name',
        lastName: 'Missing last name',
        email: 'Email is not valid',
        password: 'Password is not valid',
        already: `User with email ${credentials.email} already exists`
      };

      Object.keys(errorMessages).forEach((fieldName) => {
        if (err.response.data.includes(fieldName)) {
          notificationService.error(errorMessages[fieldName]);
        }
      });
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(registerNewUser)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                label="First Name"
                autoFocus
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                {...register('lastName')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                autoComplete="new-password"
                {...register('password')}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/auth/login">
                Already have an account? Sign in
              </NavLink>
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
