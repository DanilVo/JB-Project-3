import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import { authStore } from '../../../Redux/AuthState';
import {
  VacationAction,
  VacationActionTypes,
  vacationStore,
} from '../../../Redux/VacationState';
import './MediaCard.css';
import { RoleModel } from '../../../Models/RoleModel';

interface MediaCardProps {
  vacation: VacationModel;
  duration: number;
  delete: (vacationId: number) => Promise<void>;
  follow: (vacationId: number, isFollowing: number) => Promise<void>;
}

function MediaCard(props: MediaCardProps): JSX.Element {
  const roleValidation = authStore.getState().user;
  const storeVacations = vacationStore.getState().vacations;

  const [followersCount, setFollowersCount] = useState<number>(
    props.vacation.followersCount
  );

  const startVacation = new Date(
    props.vacation.vacationStartDate
  ).toLocaleDateString('en-GB');
  const endVacation = new Date(
    props.vacation.vacationEndDate
  ).toLocaleDateString('en-GB');

  const deleteVacation = async () => {
    await props.delete(props.vacation.vacationId);

    const action: VacationAction = {
      type: VacationActionTypes.DeleteVacation,
      payload: props.vacation.vacationId,
    };
    vacationStore.dispatch(action);
  };

  const handleFollowVacation = async () => {
    await props.follow(props.vacation.vacationId, props.vacation.isFollowing);
    updateVacationInRedux();
  };

  const updateVacationInRedux = () => {
    // Find vacation that will be modified
    const indexOfVacationToUpdate = storeVacations.findIndex(
      (v) => v.vacationId === props.vacation.vacationId
    );

    let vacationToUpdate = storeVacations[indexOfVacationToUpdate];
    // Update values for vacationStore
    if (vacationToUpdate.isFollowing) {
      vacationToUpdate.isFollowing--;
      vacationToUpdate.followersCount--;
      setFollowersCount(followersCount - 1);
    } else {
      vacationToUpdate.isFollowing++;
      vacationToUpdate.followersCount++;
      setFollowersCount(followersCount + 1);
    }

    const action: VacationAction = {
      type: VacationActionTypes.UpdateVacation,
      payload: vacationToUpdate,
    };
    vacationStore.dispatch(action);
  };

  const action =
    roleValidation.roleId === RoleModel.Admin ? (
      <ButtonGroup>
        <Button onClick={deleteVacation}>
          <DeleteForeverIcon titleAccess="Delete" />
        </Button>
        <NavLink to={`/edit/${props.vacation.vacationUuid}`}>
          <Button>
            <EditIcon titleAccess="Edit" />
          </Button>
        </NavLink>
      </ButtonGroup>
    ) : (
      <ButtonGroup>
        <Button onClick={handleFollowVacation}>
          {props.vacation.isFollowing === 1 ? (
            <BookmarkIcon />
          ) : (
            <BookmarkTwoToneIcon />
          )}
          {followersCount}
        </Button>
      </ButtonGroup>
    );

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
          action={action}
        />
        <CardMedia
          sx={{ height: 140 }}
          image={props.vacation.vacationImageUrl}
          component="div"
          title={props.vacation.destination}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.vacation.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="body2">Price:{props.vacation.price}</Typography>
        </CardActions>
      </Card>
    </motion.div>
  );
}

export default MediaCard;
