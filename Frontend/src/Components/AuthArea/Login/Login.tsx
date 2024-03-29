import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import useTitle from "../../../Utils/useTitle";
import DialogButton from "../../PassRecoveryBackdrop/DialogButton";
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

interface Props {
  setUserInSystem: Function;
}

export default function Login(props: Props) {
  useTitle("Login");
  const { register, handleSubmit } = useForm<CredentialsModel>();
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const navigate = useNavigate();

  async function login(credentials: CredentialsModel) {
    if (localStorage.getItem("verifyUser"))
      localStorage.removeItem("verifyUser");
    try {
      setOpenBackdrop(true);
      await authService.logIn(credentials);
      props.setUserInSystem(true);
      notificationService.success("You have successfully logged-in");
      navigate("/home");
    } catch (err: any) {
      notificationService.error("Email or Password are incorrect!");
    } finally {
      setOpenBackdrop(false);
    }
  }

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(http://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit(login)} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email")}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              {...register("password")}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <DialogButton />
              </Grid>
              <Grid item>
                <NavLink to="/auth/register">
                  <Button>Don't have an account? Sign Up</Button>
                </NavLink>
              </Grid>
            </Grid>
            <Typography
              variant="body2"
              color="text.secondary"
              align="center"
              sx={{ mt: 2 }}
            >
              {`Copyright © Trip Blitz ${new Date().getFullYear()}.`}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
