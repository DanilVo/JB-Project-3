import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CardDialog.css";
import VacationModel from "../../../Models/VacationModel";

interface Props {
  vacationUuid: string;
  children: any;
  vacation: VacationModel;
}

function CardDialog(props: Props): JSX.Element {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState<boolean>(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box
        onClick={() => {
          setOpenCard(!openCard);
          navigate(`/home/vacation-card/${props.vacationUuid}`);
        }}
        sx={{ cursor: "pointer" }}
      >
        {props.children}
      </Box>
      <Dialog
        aria-labelledby="responsive-dialog-title"
        aria-describedby="alert-dialog-description"
        open={openCard}
        onClose={() => {
          setOpenCard(!openCard);
          navigate(-1);
        }}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.vacation.destination}
        </DialogTitle>
        <DialogContent sx={{ display: "flex" }}>
          <Box
            component="img"
            src={props.vacation.vacationImageUrl}
            width="50%"
          />
          <Container>
            <DialogContentText id="alert-dialog-description">
              {props.vacation.description}
            </DialogContentText>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenCard(!openCard);
              navigate(-1);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CardDialog;
