import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkTwoToneIcon from '@mui/icons-material/BookmarkTwoTone';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import {
  Box,
  ButtonGroup,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';
import { RoleModel } from '../../../Models/RoleModel';
import VacationModel from '../../../Models/VacationModel';
import { authStore } from '../../../Redux/AuthState';
import {
  VacationAction,
  VacationActionTypes,
  vacationStore,
} from '../../../Redux/VacationState';
import CardDialog from '../CardDialog/CardDialog';
import './MediaCard.css';

interface MediaCardProps {
  vacation: VacationModel;
  duration: number;
  delete: (vacationId: number) => Promise<void>;
  follow: (vacationId: number, isFollowing: number) => Promise<void>;
}

function MediaCard(props: MediaCardProps): JSX.Element {
  const user = authStore.getState().user;
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
  };

  const handleFollowVacation = async () => {
    await props.follow(props.vacation.vacationId, props.vacation.isFollowing);
    updateVacationInStore();
  };

  const updateVacationInStore = () => {
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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const shareSocialMenu = [
    <Box sx={{ display: 'flex', flexDirection: 'row' }} key="socials">
      <MenuItem onClick={() => setAnchorEl(null)}>
        <FacebookShareButton
          url={window.location.href}
          title="hello world"
          hashtag="#hello"
        >
          <FacebookIcon size={28} round />
        </FacebookShareButton>
      </MenuItem>
      <MenuItem onClick={() => setAnchorEl(null)}>
        <WhatsappShareButton url={window.location.href}>
          <WhatsappIcon size={28} round />
        </WhatsappShareButton>
      </MenuItem>
    </Box>,
  ];

  const action =
    user.roleId === RoleModel.Admin ? (
      <ButtonGroup>
        <IconButton size="large" color="error" onClick={deleteVacation}>
          <DeleteForeverIcon titleAccess="Delete" />
        </IconButton>
        <NavLink to={`/edit/${props.vacation.vacationUuid}`}>
          <IconButton color="success" size="large">
            <EditIcon titleAccess="Edit" />
          </IconButton>
        </NavLink>
      </ButtonGroup>
    ) : (
      <ButtonGroup>
        <IconButton onClick={handleFollowVacation}>
          {props.vacation.isFollowing ? (
            <Badge badgeContent={followersCount} color="info">
              <Tooltip title="Remove from favorite">
                <BookmarkIcon />
              </Tooltip>
            </Badge>
          ) : (
            <Tooltip title="Add to favorite">
              <Badge badgeContent={followersCount} color="info">
                <BookmarkTwoToneIcon />
              </Badge>
            </Tooltip>
          )}
        </IconButton>
        <IconButton onClick={handleClick}>
          <Tooltip title="Share to social">
            <ShareRoundedIcon />
          </Tooltip>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          {shareSocialMenu}
        </Menu>
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
      <Card sx={{ maxWidth: 345, position: 'relative', height: 450 }}>
        <CardDialog
          vacationUuid={props.vacation.vacationUuid}
          vacation={props.vacation}
        >
          <CardMedia
            sx={{ height: 250 }}
            image={props.vacation.vacationImageUrl}
            component="div"
            title={props.vacation.destination}
          />
          <CardContent>
            <Typography variant="h4">{props.vacation.destination}</Typography>
            <Divider />
            <Typography variant="body1" color="text.secondary">
              {props.vacation.description}
            </Typography>

            <Typography variant="body2" fontWeight="bold">
              {props.vacation.price}$
            </Typography>
          </CardContent>
        </CardDialog>
        <CardActions
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            padding: 0,
            paddingTop: 5,
            background: '#FBF9F1',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          {action}
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="body2" color="text.secondary">
            {`${startVacation} - ${endVacation}`}
          </Typography>
        </CardActions>
      </Card>
    </motion.div>
  );
}

export default MediaCard;
