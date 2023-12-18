import { Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import authService from '../../../Services/AuthService';
import './Register.css';
import notificationService from '../../../Services/NotificationService';

function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function registerNewUser(credentials: UserModel) {
    try {
      await authService.register(credentials);
      notificationService.success('User has been successfully created');
      navigate('/');
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
        Register:
      </Typography>
      <form onSubmit={handleSubmit(registerNewUser)}>
        <TextField
          id="outlined-basic"
          label="First Name:"
          variant="outlined"
          required
          {...register('firstName')}
        />
        <TextField
          id="outlined-basic"
          label="Last Name:"
          variant="outlined"
          required
          {...register('lastName')}
        />
        <TextField
          id="outlined-basic"
          label="Email:"
          variant="outlined"
          required
          {...register('email')}
        />
        <TextField
          id="outlined-basic"
          label="Password:"
          type="password"
          variant="outlined"
          required
          {...register('password')}
        />
        <Button variant="outlined" type="submit">
          Register
        </Button>
        <NavLink to="/auth/login">
          <Button variant="text" size="small">
            Login
          </Button>
        </NavLink>
      </form>
    </motion.div>
  );
}

export default Register;
