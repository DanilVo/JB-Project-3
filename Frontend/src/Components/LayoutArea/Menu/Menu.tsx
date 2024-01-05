import { Button, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';

interface Props {
  userRole: number;
  setFilterVacations: (filter: string) => void;
}

function navMenu(props: Props): JSX.Element {
  const adminMenu = [
    <NavLink to="/home">Home</NavLink>,
    <NavLink to="/reports">Reports</NavLink>,
    <NavLink to="/add-vacation">Add</NavLink>,
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
    <MenuItem onClick={handleClose}>My Vacations</MenuItem>,
    <MenuItem onClick={handleClose}>Yet to start</MenuItem>,
    <MenuItem onClick={handleClose}>Active now</MenuItem>,
    <MenuItem onClick={handleClose}>All vacations</MenuItem>,
  ];
  return (
    <div className="Menu">
      <Button>About us</Button>
      <Button>Contact Us</Button>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.userRole === 1 ? 'Actions' : 'Filters'}
      </Button>
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
export default navMenu;
