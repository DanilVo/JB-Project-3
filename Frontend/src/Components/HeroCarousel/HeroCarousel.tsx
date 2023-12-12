import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./HeroCarousel.css";
import hero1 from "../../assets/images/vacation_images/hero-1.jpg";
import hero2 from "../../assets/images/vacation_images/hero-2.jpg";
import hero3 from "../../assets/images/vacation_images/hero-3.jpg";
import hero4 from "../../assets/images/vacation_images/hero-4.jpg";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

const heroImages = [
  { imgUrl: hero1, alt: "greece" },
  { imgUrl: hero2, alt: "venice" },
  { imgUrl: hero3, alt: "hotel" },
  { imgUrl: hero4, alt: "beach" },
];

function HeroCarousel(): JSX.Element {
  return (
    <motion.div
      className="hero-carousel"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      animate={{ x: -20 }}
      transition={{ ease: "easeOut", duration: 1.5 }}
    >
      <Carousel
        showThumbs={false}
        autoPlay
        infiniteLoop
        interval={4000}
        showArrows={false}
        showStatus={false}
      >
        {heroImages.map((image) => (
          <img src={image.imgUrl} alt={image.alt} key={image.alt} />
        ))}
      </Carousel>
      <Button
        className="startNow"
        variant="contained"
        size="large"
      >
        Start now
      </Button>
    </motion.div>
  );
}

export default HeroCarousel;
