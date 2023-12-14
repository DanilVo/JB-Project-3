import { useForm } from "react-hook-form";
import "./Login.css";
import CredentialsModel from "../../../Models/CredentialsModel";
import { Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

function Login(): JSX.Element {
  const { register, handleSubmit } = useForm<CredentialsModel>();

  async function login(credentials: CredentialsModel) {
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
        LogIn:
      </Typography>
      <form onSubmit={handleSubmit(login)}>
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
        <Button variant="outlined">LogIn</Button>
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
