import { useForm } from 'react-hook-form';
import './Login.css';
import CredentialsModel from '../../../Models/CredentialsModel';
import { Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { NavLink, Navigate, redirect, useNavigate } from 'react-router-dom';
import authService from '../../../Services/AuthService';
import notificationService from '../../../Services/NotificationService';

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();

  async function login(credentials: CredentialsModel) {
    try {
      await authService.logIn(credentials);
      notificationService.success('You have been logged-in successfully');
      navigate("/home")
    } catch (err: any) {
      notificationService.error(err.message);
    }
  }

  return (
    <motion.div
      className="Login"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      animate={{ y: 100 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
      <Typography variant="h4" color="Highlight" align="center">
        LogIn:
      </Typography>
      <form onSubmit={handleSubmit(login)}>
        <TextField
          id="outlined-basic"
          label="Email:"
          variant="outlined"
          type="email"
          required
          {...register("email")}
        />
        <TextField
          id="outlined-basic"
          label="Password:"
          type="password"
          minLength="4"
          variant="outlined"
          required
          {...register("password")}
        />
        <Button variant="outlined" type="submit">
          LogIn
        </Button>
        <NavLink to="/auth/register">
          <Button variant="text" size="small">
            Register
          </Button>
        </NavLink>
        <NavLink to="/auth/register">
          <Button variant="text" size="small">
            Forgot your password?
          </Button>
        </NavLink>
      </form>
    </motion.div>
  );
}

export default Login;
