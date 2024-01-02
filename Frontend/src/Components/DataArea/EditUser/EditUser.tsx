import { Button, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import { userStore } from '../../../Redux/UserState';
import notificationService from '../../../Services/NotificationService';
import userService from '../../../Services/UserService';
import './EditUser.css';

function EditUser(): JSX.Element {
  const userFromState = userStore.getState().user;

  const { register, handleSubmit, setValue } = useForm<UserModel>();
  const navigate = useNavigate();

  async function editUser(user: UserModel) {
    try {
      user.userId = userFromState.userId;
      await userService.updateUser(user);
      notificationService.success("User has been successfully updated");
      navigate(-1);
    } catch (err: any) {
      notificationService.error("Failed to edit user: " + err.message);
    }
  }

  useEffect(() => {
    setValue('firstName', userFromState.firstName);
    setValue('lastName', userFromState.lastName);
    setValue('email', userFromState.email);

    // setValue(); add password edit
    // setValue();
  }, []);

  return (
    <div className="editUser">
      <motion.div
        className="Login"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: 100 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
      >
        <Typography variant="h4" color="Highlight" align="center">
          Edit:
        </Typography>
        <form onSubmit={handleSubmit(editUser)}>
          <TextField
            id="outlined-basic"
            type="text"
            label="First Name:"
            variant="outlined"
            {...register("firstName")}
          />
          <TextField
            id="outlined-basic"
            type="text"
            label="Last Name:"
            variant="outlined"
            {...register("lastName")}
          />
          <TextField
            id="outlined-basic"
            type="email"
            label="Email:"
            variant="outlined"
            {...register("email")}
          />
          <Button variant="outlined" type="submit">
            Save Changes
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default EditUser;
