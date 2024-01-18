import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  AppBar,
  Avatar,
  Box,
  CardHeader,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import UserModel from '../../../Models/UserModel';
import { authStore } from '../../../Redux/AuthState';
import authService from '../../../Services/AuthService';
import logo from '../../../assets/logo/logo-main-no-background.svg';
import './Header.css';
import CameraIcon from '@mui/icons-material/PhotoCamera';

interface Parent {
  setUserInSystem: Function;
}

function Header(props: Parent): JSX.Element {
  const user: UserModel = authStore.getState().user;

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    authService.logout();
    props.setUserInSystem(false);
    navigate('/auth/login');
  };

  const handleCloseWindow = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box component="img" src={logo} alt="logo" sx={{ height: 80 }} />
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar sx={{ bgcolor: 'red' }}>R</Avatar>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseWindow}
            >
              <NavLink to={`edit/user/${user.uuid}`}>
                <MenuItem>Settings</MenuItem>
              </NavLink>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
