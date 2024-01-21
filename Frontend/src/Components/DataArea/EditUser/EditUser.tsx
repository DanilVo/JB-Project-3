import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import userService from "../../../Services/UserService";
import appConfig from "../../../Utils/AppConfig";
import "./EditUser.css";

function EditUser(): JSX.Element {
  const userFromState: UserModel = authStore.getState().user;

  const { register, handleSubmit, setValue } = useForm<UserModel>();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [newImage, setNewImage] = useState<boolean>(false);

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
    setNewImage(true);
    setImageToUpload(e.target.files);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  async function editUser(user: UserModel) {
    try {
      user = {
        ...user,
        roleId: userFromState.roleId,
        userId: userFromState.userId,
      };
      if (newImage) {
        user.image = (imageToUpload as unknown as FileList)[0];
      }
      await userService.updateUser(user);
      notificationService.success("User has been successfully updated");
      navigate("/home");
    } catch (err: any) {
      notificationService.error("Failed to edit user: " + err.message);
    }
  }

  useEffect(() => {
    setPreviewImage(`${appConfig.userImageUrl}${userFromState.userImageUrl}`);
    setImageToUpload(`${appConfig.userImageUrl}${userFromState.userImageUrl}`);
    setValue("firstName", userFromState.firstName);
    setValue("lastName", userFromState.lastName);
    setValue("email", userFromState.email);
    setValue("userImageUrl", userFromState.userImageUrl);
    // setValue(); add password edit
    // setValue();
  }, []);

  return (
    <Container>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <Typography variant="h4" color="Highlight" align="center">
          Edit:
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(editUser)}
          sx={{ m: "auto" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <TextField
                  sx={{ mt: 2 }}
                  type="text"
                  label="First Name:"
                  variant="outlined"
                  {...register("firstName")}
                />
                <TextField
                  sx={{ mt: 2 }}
                  type="text"
                  label="Last Name:"
                  variant="outlined"
                  {...register("lastName")}
                />
                <TextField
                  sx={{ mt: 2, mb: 2 }}
                  type="email"
                  label="Email:"
                  variant="outlined"
                  {...register("email")}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={previewImage}
                  style={{
                    marginTop: "10px",
                    height: "200px",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
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
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" type="submit" sx={{}}>
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}

export default EditUser;
