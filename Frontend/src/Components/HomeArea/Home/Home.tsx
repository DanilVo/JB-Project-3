import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import logo from '../../../assets/images/DV.png';
import background from '../../../assets/images/background.jpg';
import './Home.css';
import HeroCarousel from '../../HeroCarousel/HeroCarousel';
import { motion } from 'framer-motion';

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
      <div className="firstLine">
        <motion.div
          className="line1"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <Typography variant="h3">Best Vacation on Best Price</Typography>
          <Button className="startNow" variant="contained" size="large">
            Start now
          </Button>
        </motion.div>
      </div>
      <div className="carouselSection">
        <HeroCarousel />
      </div>
      <div className="carousel3"></div>
      <div className="carousel4"></div>
      <div className="carousel5"></div>
    </div>
  );
}

export default Home;
