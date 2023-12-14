import { Typography } from "@mui/material";
import logo from "../../../assets/logo/logo-main-no-background.svg";
import "./Header.css";
 
function Header(): JSX.Element {
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

export default Header