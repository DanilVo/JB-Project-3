import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, CardHeader, IconButton, Menu, MenuItem } from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import {
  UserAction,
  UserActionTypes,
  userStore,
} from '../../../Redux/UserState';
import authService from '../../../Services/AuthService';
import logo from '../../../assets/logo/logo-main-no-background.svg';
import './Header.css';
import { authStore } from '../../../Redux/AuthState';

interface Parent {
  setToken: Function;
}

function Header(props: Parent): JSX.Element {
  const user: UserModel = userStore.getState().user;
  if (user.firstName === undefined) {
    const action: UserAction = {
      type: UserActionTypes.SetUser,
      payload: authStore.getState().user,
    };
    userStore.dispatch(action);
  }

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    authService.logout();
    props.setToken(false);
    navigate('/auth/login');
  };

  const handleCloseWindow = () => {
    setAnchorEl(null);
  };

  return (
    <div className="Header">
      <img src={logo} alt="logo" className="logo" />
      <div className="userName">
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton
              aria-label="settings"
              aria-controls={open ? 'basic-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={`Hello ${user?.firstName} ${user?.lastName}`}
          subheader={user?.email}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseWindow}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <NavLink to={`edit/user/${user.uuid}`}>
            <MenuItem>Settings</MenuItem>
          </NavLink>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
