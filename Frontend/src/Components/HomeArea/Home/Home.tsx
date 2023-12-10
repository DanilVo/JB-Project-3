import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "../../../assets/images/DV.png";
import "./Home.css";
import HeroCarousel from "../../HeroCarousel/HeroCarousel";

function Home(): JSX.Element {
  return (
    <div className="Home">
      <header>
        <div className="smallNav">
          <img className="logo" src={logo}></img>
        </div>
        <div className="title">
          <Typography variant="h2" color="initial">
            The Leader in Booking Services
          </Typography>
          <Button className="startNow" variant="contained" size="large">
            Start now
          </Button>
        </div>
      </header>
      <div className="carousel1"><HeroCarousel/></div>
      <div className="carousel2"></div>
      <div className="carousel3"></div>
      <div className="carousel4"></div>
      <div className="carousel5"></div>
    </div>
  );
}

export default Home;
