import {
  Backdrop,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import './DialogButton.css';
import authService from '../../Services/AuthService';
import notificationService from '../../Services/NotificationService';
import { useNavigate } from 'react-router-dom';

function DialogButton(): JSX.Element {
  const navigate = useNavigate();

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openBackdrop, setOpenBackdrop] = useState<boolean>(false);

  const [emailSended, setEmailSended] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const verificationEmail = async (email: string) => {
    try {
      setOpenBackdrop(true);
      if (!email.length) return;
      await authService.sendVerificationEmail(inputValue);
      setInputValue('');
      setEmailSended(true);
    } catch (err: any) {
      notificationService.error('Try again later');
    } finally {
      setOpenBackdrop(false);
    }
  };

  const verifyCode = async (code: string) => {
    setOpenBackdrop(true);
    try {
      await authService.verifyCode(+code);
      navigate('/passwordRecovery');
      setInputValue('');
    } catch (err: any) {
      notificationService.error('Verification code is not valid');
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
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openBackdrop}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle id="alert-dialog-title">
          {emailSended
            ? 'Enter verification code from your Email:'
            : 'Verification code will be sent to your Email:'}
        </DialogTitle>
        <DialogContent>
          <TextField
            required
            label={emailSended ? 'Verification code:' : 'Enter your Email:'}
            fullWidth
            margin="normal"
            name="email"
            autoComplete={emailSended ? '' : 'email'}
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
          />
        </DialogContent>
        <DialogActions>
          {emailSended ? (
            <Button onClick={() => verifyCode(inputValue)}>
              Update password
            </Button>
          ) : (
            <Button onClick={() => verificationEmail(inputValue)}>
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
