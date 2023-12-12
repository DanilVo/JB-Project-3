import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";
import logo from "../../../assets/logo/logo-main-no-background.svg";
import HeroCarousel from "../../HeroCarousel/HeroCarousel";
import "./Home.css";


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
      <main>
        <div className="firstLine">
          <motion.div
            className="firstLineDiv"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ x: 100 }}
            transition={{ ease: "easeOut", duration: 1.5 }}
          >
            <Typography variant="h3">Best Vacation On Best Price</Typography>
            <Button className="startNow" variant="contained" size="large">
              Start now
            </Button>
          </motion.div>
        </div>
        <div className="carouselSection">
          <HeroCarousel />
        </div>
        <div className="supportAd">
          <motion.div
            className="supportAdDiv"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ x: 100 }}
            transition={{ ease: "easeOut", duration: 1.5 }}
          >
            <Typography variant="h3">Anywhere, Anytime </Typography>
            <Button className="startNow" variant="contained" size="large">
              Start now
            </Button>
          </motion.div>
        </div>
        <div className="bookNow">
          <motion.div
            className="bookNowDiv"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            animate={{ x: -100 }}
            transition={{ ease: "easeOut", duration: 1.5 }}
          >
            <Typography variant="h3">Book Vacation With One Click </Typography>
            <Button className="startNow" variant="contained" size="large">
              Start now
            </Button>
          </motion.div>
        </div>
        <div className="dreamVacation">
          <motion.div
            className="dreamVacationDiv"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <Typography variant="h3">
              Make Your Dream Vacation Come To Life{" "}
            </Typography>
            <Button className="startNow" variant="contained" size="large">
              Start now
            </Button>
          </motion.div>
        </div>
      </main>
      <footer>
        <motion.div className="createdBy">
          <Typography variant="body1" color="initial">
            This Website Was Designed By Danil Volobuyev.
          </Typography>
          <Typography variant="body1" color="initial"> Inspired by WIX</Typography>
        </motion.div>
      </footer>
    </div>
  );
}

export default Home;
