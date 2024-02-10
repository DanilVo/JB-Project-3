import { Box, Button, ButtonGroup, MenuItem } from "@mui/material";
import Menu from "@mui/material/Menu";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Menu.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { RoleModel } from "../../../Models/RoleModel";
import HomeIcon from "@mui/icons-material/Home";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ListIcon from "@mui/icons-material/List";
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
    <NavLink to="/dashboard" key="dashboard">
      <MenuItem onClick={handleDropdownMenuClick}>Dashboard</MenuItem>
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="div"
        sx={{
          m: 1,
          p: "0 20px",
          border: "1px solid blue",
          borderRadius: 25,
          bgcolor: "#f9f9f9",
          boxShadow: "-5px -5px 10px #d0d0d0,5px 5px 10px #ffffff",
        }}
      >
        <ButtonGroup variant="text">
          <Button onClick={handleClick} startIcon={<ListIcon />}>
            {props.userRole === RoleModel.Admin ? "Actions" : "Filters"}
            <ArrowDropDownIcon />
          </Button>
          <NavLink to="/home">
            <Button startIcon={<HomeIcon />}>Home</Button>
          </NavLink>
          <NavLink to="/about-us">
            <Button startIcon={<InfoOutlinedIcon />}>About us</Button>
          </NavLink>
        </ButtonGroup>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleDropdownMenuClick}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          {props.userRole === RoleModel.Admin ? adminMenu : userMenu}
        </Menu>
      </Box>
    </Box>
  );
}
export default NavMenu;
