import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import VacationModel from "../../../Models/VacationModel";
import "./MediaCard.css";
import { motion } from "framer-motion";

function MediaCard({
  vacation,
  duration,
}: {
  vacation: VacationModel;
  duration: number;
}): JSX.Element {
  const startVacation = new Date(vacation.vacationStartDate).toLocaleDateString(
    "en-GB"
  );
  const endVacation = new Date(vacation.vacationEndDate).toLocaleDateString(
    "en-GB"
  );

  return (
    <motion.div
      className="MediaCard"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: duration,
        delay: duration,
        ease: [0, 0.71, 0.2, 1.01],
      }}
    >
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={vacation.destination}
          subheader={`${startVacation} - ${endVacation}`}
        />
        <CardMedia sx={{ height: 140 }} image={vacation.vacationImageUrl} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {vacation.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Follow</Button>
          <Typography variant="body2">Price:{vacation.price}</Typography>
        </CardActions>
      </Card>
    </motion.div>
  );
}

export default MediaCard;
