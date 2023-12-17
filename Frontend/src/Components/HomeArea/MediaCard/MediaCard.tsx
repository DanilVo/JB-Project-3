import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import VacationModel from "../../../Models/VacationModel";
import "./MediaCard.css";

function MediaCard({ vacation }: { vacation: VacationModel }): JSX.Element {
  const startVacation = new Date(vacation.vacationStartDate).toLocaleDateString(
    "en-GB"
  );
  const endVacation = new Date(vacation.vacationEndDate).toLocaleDateString(
    "en-GB"
  );

  return (
    <div className="MediaCard">
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title={vacation.destination}
          subheader={`${startVacation} - ${endVacation}`}
        />
        <CardMedia
          sx={{ height: 140 }}
          image={vacation.vacationImageUrl}
        />
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
    </div>
  );
}

export default MediaCard;
