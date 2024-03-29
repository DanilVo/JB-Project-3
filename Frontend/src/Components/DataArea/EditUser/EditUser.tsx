import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../Models/UserModel";
import { authStore } from "../../../Redux/AuthState";
import notificationService from "../../../Services/NotificationService";
import userService from "../../../Services/UserService";
import appConfig from "../../../Utils/AppConfig";
import useTitle from "../../../Utils/useTitle";
import DialogButton from "../../PassRecoveryBackdrop/DialogButton";
import DragDropFileUpload from "../DragDropFileUpload/DragDropFileUpload";
import "./EditUser.css";
import DeleteButton from "../../ComponentAssets/DeleteButton/DeleteButton";

interface ErrorMessages {
  [key: string]: string;
}

function EditUser({ setUserInSystem }: { setUserInSystem :Function}): JSX.Element {
  useTitle("Edit user");
  const userFromState: UserModel = authStore.getState().user;
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const { register, handleSubmit, setValue } = useForm<UserModel>();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const [newImage, setNewImage] = useState<boolean>(false);

  const imageExtract = (file: File) => {
    const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    if (!validImageTypes.includes(file.type)) {
      notificationService.error("File format is not valid");
      return;
    }
    if (file.size > 1000000) {
      notificationService.error("Image is to large");
      return;
    }

    setNewImage(true);
    setImageToUpload(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  async function editUser(user: UserModel) {
    try {
      setOpenBackdrop(true);
      user = {
        ...user,
        roleId: userFromState.roleId,
        userId: userFromState.userId,
      };
      if (newImage) {
        user.image = imageToUpload;
      }
      await userService.updateUser(user);
      notificationService.success("User has been successfully updated");
      navigate("/home");
    } catch (err: any) {
      const errorMessages: ErrorMessages = {
        firstName: "Missing first name",
        lastName: "Missing last name",
        email: "Email is missing",
      };

      Object.keys(errorMessages).forEach((fieldName) => {
        if (err.response.data.includes(fieldName)) {
          notificationService.error(errorMessages[fieldName]);
        }
      });
    } finally {
      setOpenBackdrop(false);
    }
  }

  useEffect(() => {
    setPreviewImage(`${appConfig.userImageUrl}${userFromState.userImageUrl}`);
    setImageToUpload(`${appConfig.userImageUrl}${userFromState.userImageUrl}`);
    setValue("firstName", userFromState.firstName);
    setValue("lastName", userFromState.lastName);
    setValue("email", userFromState.email);
    setValue("userImageUrl", userFromState.userImageUrl);
  }, []);

  return (
    <Container>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
      >
        <Typography
          variant="h4"
          color="Highlight"
          align="center"
          marginBottom={3}
        >
          Edit User:
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
                <DialogButton />
                <DeleteButton
                  userUuid={userFromState.uuid}
                  setUserInSystem={setUserInSystem}
                />
              </Box>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={12} sm={5}>
              {imageToUpload ? (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="outlined"
                    sx={{ width: "fit-content", m: "auto" }}
                    color="error"
                    onClick={() => {
                      setImageToUpload(false);
                      setPreviewImage(false);
                    }}
                  >
                    Change Image
                  </Button>
                  <Box
                    component="img"
                    src={previewImage}
                    style={{
                      display: "flex",
                      margin: "auto",
                      paddingTop: "15px",
                      height: "300px",
                      width: "380px",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: { sm: 5 },
                  }}
                >
                  <DragDropFileUpload
                    onFileUpload={imageExtract}
                    fileType="image/*"
                  />
                </Box>
              )}
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
              <Button variant="outlined" type="submit">
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
