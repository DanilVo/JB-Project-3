import { useForm } from "react-hook-form";
import "./Register.css";
import UserModel from "../../../Models/UserModel";
import { motion } from "framer-motion";
import { Button, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

function Register(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();

  async function login(credentials: UserModel) {
    try {
    } catch (err: any) {
      console.log(err.message);
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
        Register:
      </Typography>
      <form onSubmit={handleSubmit(login)}>
        <TextField
          id="outlined-basic"
          label="First Name:"
          variant="outlined"
          required
          {...register("firstName")}
        />
        <TextField
          id="outlined-basic"
          label="Last Name:"
          variant="outlined"
          required
          {...register("lastName")}
        />
        <TextField
          id="outlined-basic"
          label="Email:"
          variant="outlined"
          required
          {...register("email")}
        />
        <TextField
          id="outlined-basic"
          label="Password:"
          type="password"
          variant="outlined"
          required
          {...register("password")}
        />
        <Button variant="outlined">Register</Button>
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
