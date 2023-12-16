import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import VacationModel from '../../../Models/VacationModel';

function MediaCard({ vacation }: { vacation: VacationModel }): JSX.Element {
  return (
    <div className="MediaCard">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={vacation.destination}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {vacation.destination}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {vacation.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default MediaCard;
