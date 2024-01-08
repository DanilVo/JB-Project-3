import { Button, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

interface Props {
  userRole: number;
  setFilterVacations: (filter: string) => void;
}

function NavMenu(props: Props): JSX.Element {
  const adminMenu = [
    <MenuItem key="1">
      <NavLink to="/home">Home</NavLink>
    </MenuItem>,
    <MenuItem key="2">
      <NavLink to="/reports">Reports</NavLink>
    </MenuItem>,
    <MenuItem key="3">
      <NavLink to="/add-vacation">Add</NavLink>
    </MenuItem>,
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (e: any) => {
    props.setFilterVacations(e.target.outerText);
    setAnchorEl(null);
  };
  const userMenu = [
    <MenuItem key="4" onClick={handleClose}>
      My Vacations
    </MenuItem>,
    <MenuItem key="5" onClick={handleClose}>
      Yet to start
    </MenuItem>,
    <MenuItem key="6" onClick={handleClose}>
      Active now
    </MenuItem>,
    <MenuItem key="7" onClick={handleClose}>
      All vacations
    </MenuItem>,
  ];
  return (
    <div className="Menu">
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.userRole === 1 ? 'Actions' : 'Filters'}
      </Button>
      <NavLink to="/home">
        <Button>Home</Button>
      </NavLink>
      <Button>About us</Button>
      <Button>Contact Us</Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {props.userRole === 1 ? adminMenu : userMenu}
      </Menu>
    </div>
  );
}
export default NavMenu;
