import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
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

interface Props {
  setUserInSystem: Function;
}

function Header(props: Props): JSX.Element {
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

  return (
    <AppBar position="static">
      <Container
        maxWidth="xl"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ height: 80 }}
          onClick={() => navigate('/home')}
        />
        <Toolbar disableGutters>
          <Box
            sx={{
              flexGrow: 0,
              maxWidth: 320,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Paper
              elevation={8}
              sx={{
                mr: 2,
                borderRadius: 3,
                padding: 1,
                background: '#1976d2',
                boxShadow:
                  'inset -5px 5px 10px #1561ac, inset 5px -5px 10px #1e8bf8',
              }}
            >
              <Typography variant="body1" color="black" ml={1}>
                <b>Welcome:</b> {user.firstName} {user.lastName}.
              </Typography>
              <Typography variant="body2" color="black" ml={0.5}>
                {user.email}
              </Typography>
            </Paper>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar
                sx={{ bgcolor: 'grey', boxShadow: '1px 1px 10px black' }}
                src={
                  user.userImageUrl
                    ? `http://localhost:4000/api/user/image/${user.userImageUrl}`
                    : `${user.firstName.slice(0, 1)}${user.lastName.slice(0, 1)}`
                }
              ></Avatar>
            </IconButton>
            <Menu
              id="user-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
            >
              <NavLink to={`edit/user/${user.uuid}`}>
                <MenuItem onClick={() => setAnchorEl(null)}>Settings</MenuItem>
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
