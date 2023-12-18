import { Typography } from '@mui/material';
import logo from '../../../assets/logo/logo-main-no-background.svg';
import './Header.css';
import { authStore } from '../../../Redux/AuthState';
import UserModel from '../../../Models/UserModel';

function Header(): JSX.Element {
  const user: UserModel = authStore.getState().user;
  console.log(user.lastName);

  return (
    <div className="Header">
      <img src={logo} alt="logo" className="logo" />
      <div className="userName">
        <Typography variant="body1" color="initial">
          Hello Danil
        </Typography>
      </div>
    </div>
  );
}

export default Header;
