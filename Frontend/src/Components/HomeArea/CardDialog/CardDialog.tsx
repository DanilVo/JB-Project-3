import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CardDialog.css";

function CardDialog(): JSX.Element {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState(false);

  return (
    <>
      <Dialog
        open={props.openCard}
        onClose={() => {
          props.setShowCard();
          navigate(-1);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">asdgfadfhfg</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            asdasdas
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              props.setShowCard();
              navigate(-1);
            }}
          >
            Disagree
          </Button>
          <Button
            onClick={() => {
              props.setShowCard();
              navigate(-1);
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CardDialog;
