import {
  Avatar,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import UserModel from '../../../Models/UserModel';
import { authStore } from '../../../Redux/AuthState';
import logo from '../../../assets/logo/logo-main-no-background.svg';
import './Header.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import authService from '../../../Services/AuthService';
import { useNavigate } from 'react-router-dom';

function Header(): JSX.Element {
  const user: UserModel = authStore.getState().user;
  
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    authService.logout()
    navigate('/auth/login')
  };

  const handleCloseWindow = () => {
    setAnchorEl(null)
  }

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
          title={`Hello ${user.firstName} ${user.lastName}`}
          subheader={user.email}
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default Header;
