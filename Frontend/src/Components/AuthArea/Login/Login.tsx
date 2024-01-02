import { Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import CredentialsModel from '../../../Models/CredentialsModel';
import authService from '../../../Services/AuthService';
import notificationService from '../../../Services/NotificationService';
import './Login.css';

interface Props {
  setUserInSystem: Function;
}

function Login(props: Props): JSX.Element {

  
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const navigate = useNavigate();
  
  async function login(credentials: CredentialsModel) {
    try {
      await authService.logIn(credentials);
      props.setUserInSystem(true)
      notificationService.success('You have been logged-in successfully');
      navigate('/home');
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
      transition={{ ease: 'easeOut', duration: 1.5 }}
    >
      <Typography variant="h4" color="Highlight" align="center">
        LogIn:
      </Typography>
      <form onSubmit={handleSubmit(login)}>
        <TextField
          id="outlined-basic1"
          label="Email:"
          variant="outlined"
          type="email"
          required
          {...register('email')}
        />
        <TextField
          id="outlined-basic2"
          label="Password:"
          type="password"
          minLength="4"
          variant="outlined"
          required
          {...register('password')}
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
