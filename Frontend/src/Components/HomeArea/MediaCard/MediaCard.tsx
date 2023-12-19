import { ButtonGroup } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./MediaCard.css";

interface MediaCardProps {
  vacation: VacationModel;
  duration: number;
  delete: (id: number) => Promise<void>;
}

function MediaCard(props: MediaCardProps): JSX.Element {
  const startVacation = new Date(
    props.vacation.vacationStartDate
  ).toLocaleDateString("en-GB");
  const endVacation = new Date(
    props.vacation.vacationEndDate
  ).toLocaleDateString("en-GB");

  const deleteVacation = async () => {
    await props.delete(props.vacation.vacationId);
  };

  return (
    <motion.div
      className="MediaCard"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: props.duration,
        delay: props.duration,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={props.vacation.destination}
          subheader={`${startVacation} - ${endVacation}`}
          action={
            <ButtonGroup>
              <Button onClick={deleteVacation}>Delete</Button>
              <NavLink to={`/edit/${props.vacation.vacationId}`}>
                <Button>Edit</Button>
              </NavLink>
            </ButtonGroup>
          }
        />
        <CardMedia
          sx={{ height: 140 }}
          image={props.vacation.vacationImageUrl}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.vacation.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Follow</Button>
          <Typography variant="body2">Price:{props.vacation.price}</Typography>
        </CardActions>
      </Card>
    </motion.div>
  );
}

export default MediaCard;
