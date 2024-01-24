import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import "./DialogButton.css";
import authService from "../../Services/AuthService";
import notificationService from "../../Services/NotificationService";

function DialogButton(): JSX.Element {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [emailSended, setEmailSended] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<number>(null);

  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const sendVerificationEmail = async (email: string) => {
    try {
      setOpenBackdrop(true);
      if (!email.length) return;
      await authService.passwordRecovery(email);
      setEmail("");
      setEmailSended(true);
    } catch (err: any) {
      notificationService.error(err.message);
    } finally {
      setOpenBackdrop(false);
    }
  };

  const verifyCode = async (code: number) => {
    try {
      setOpenBackdrop(true);
      // await
      setCode(null);
    } catch (err: any) {
      notificationService.error(err.message);
    } finally {
      setOpenBackdrop(false);
    }
  };

  return (
    <>
      <Button variant="text" onClick={() => setOpenDialog(true)}>
        Forgot password?
      </Button>
      <Dialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEmailSended(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle id="alert-dialog-title">
          {emailSended
            ? "Enter verification code from your Email:"
            : "Verification code will be sent to your Email:"}
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            label={emailSended ? "Verification code:" : "Enter your Email:"}
            fullWidth
            margin="normal"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          {emailSended ? (
            <Button onClick={() => verifyCode(code)}>Update password</Button>
          ) : (
            <Button onClick={() => sendVerificationEmail(email)}>
              Send email
            </Button>
          )}

          <Button
            onClick={() => {
              setOpenDialog(false);
              setEmailSended(false);
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogButton;
