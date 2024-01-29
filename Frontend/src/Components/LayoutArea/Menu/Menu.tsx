import { Button, MenuItem } from '@mui/material';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { RoleModel } from '../../../Models/RoleModel';

interface Props {
  userRole: number;
  setFilterVacations: (filter: string) => void;
}

function NavMenu(props: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownMenuClick = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    setAnchorEl(null);
    const { myValue } = e.currentTarget.dataset;
    props.setFilterVacations(myValue);
  };

  const adminMenu = [
    <NavLink to="/reports" key="reports">
      <MenuItem onClick={handleDropdownMenuClick}>Reports</MenuItem>
    </NavLink>,
    <NavLink to="/add-vacation" key="add-vacation">
      <MenuItem onClick={handleDropdownMenuClick}>Add</MenuItem>
    </NavLink>,
  ];

  const userMenu = [
    <MenuItem
      key="My-Vacations"
      data-my-value="My-Vacations"
      onClick={handleDropdownMenuClick}
    >
      My Vacations
    </MenuItem>,
    <MenuItem
      key="Yet-to-start"
      data-my-value="Yet-to-start"
      onClick={handleDropdownMenuClick}
    >
      Yet to start
    </MenuItem>,
    <MenuItem
      key="Active-now"
      data-my-value="Active-now"
      onClick={handleDropdownMenuClick}
    >
      Active now
    </MenuItem>,
    <MenuItem
      key="All-vacations"
      data-my-value="All-vacations"
      onClick={handleDropdownMenuClick}
    >
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
        {props.userRole === RoleModel.Admin ? 'Actions' : 'Filters'}
        <ArrowDropDownIcon />
      </Button>
      <NavLink to="/home">
        <Button>Home</Button>
      </NavLink>
      <Button>About us</Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleDropdownMenuClick}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {props.userRole === RoleModel.Admin ? adminMenu : userMenu}
      </Menu>
    </div>
  );
}
export default NavMenu;
