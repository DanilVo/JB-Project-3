import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import "./Register.css";
import { useState } from "react";

interface Props {
  setUserInSystem: Function;
}

function Register(props: Props): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const navigate = useNavigate();

  async function registerNewUser(credentials: UserModel) {
    try {
      credentials.image = (imageToUpload as unknown as FileList)[0];
      console.log(credentials);
      
      await authService.register(credentials);
      notificationService.success("User has been successfully created");
      props.setUserInSystem(true);
      navigate("/home");
    } catch (err: any) {
      notificationService.error(err.message);
    }
  }

  const [previewImage, setPreviewImage] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const imageExtract = (e: any) => {
    setImageToUpload(e.target.files);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

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
      <form onSubmit={handleSubmit(registerNewUser)}>
        <TextField
          id="outlined-basic1"
          type="text"
          label="First Name:"
          variant="outlined"
          required
          {...register("firstName")}
        />
        <TextField
          id="outlined-basic2"
          type="text"
          label="Last Name:"
          variant="outlined"
          required
          {...register("lastName")}
        />
        <TextField
          id="outlined-basic3"
          type="email"
          label="Email:"
          variant="outlined"
          required
          {...register("email")}
        />
        <TextField
          id="outlined-basic4"
          label="Password:"
          type="password"
          variant="outlined"
          minLength="4"
          required
          {...register("password")}
        />
        <img src={previewImage} style={{ height: "200px" }} />

        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload image
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onInput={imageExtract}
            {...register("image")}
          />
        </Button>

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
