import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import PasswordRecoveryModel from "../../../Models/PasswordRecoveryModel";
import notificationService from "../../../Services/NotificationService";

export default function PasswordRecovery(): JSX.Element {
  const { register, handleSubmit } = useForm<PasswordRecoveryModel>();
  const navigate = useNavigate();

  async function setNewPassword(credentials: PasswordRecoveryModel) {
    try {
      // await authService.register(credentials);
      notificationService.success("Password has been successfully changed");
      navigate("/auth/login");
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
                id="password"
                label="New password"
                name="password"
                type="password"
                autoComplete="password"
                {...register("password")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="verifyPassword"
                label="Verify password"
                type="password"
                id="verifyPassword"
                autoComplete="verifyPassword"
                {...register("verifyPassword")}
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
