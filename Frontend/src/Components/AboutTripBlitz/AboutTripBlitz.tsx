import { Box, Container, Grid, Typography } from "@mui/material";
import aboutUsOpening from "../../assets/images/images_near_texts/about-us-opening.jpg";
import customerService from "../../assets/images/images_near_texts/customer-service.png";
import enjoyVacation from "../../assets/images/images_near_texts/enjoy-vacation.png";
import familyVacation from "../../assets/images/images_near_texts/family-vacation.png";
import "./AboutTripBlitz.css";

function AboutTripBlitz(): JSX.Element {
  return (
    <Container>
      <Typography
        variant="h3"
        sx={{ display: "flex", justifyContent: "center", mt: 5 }}
        color="Highlight"
      >
        Trip Blitz - Explore best vacations
      </Typography>
      <Box
        component="img"
        src={aboutUsOpening}
        sx={{
          display: "flex",
          scale: "0.9",
          m: "auto",
          width: "80%",
          borderRadius: 10,
        }}
      />

      <Grid container rowSpacing={10}>
        <Grid
          item
          xs={12}
          sm={6}
          sx={{
            m: "auto",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              p: 5,
              boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
              borderRadius: "50px",
              background: "#ffe5e5",
            }}
          >
            Welcome to Trip Blitz, the ultimate vacations manager web
            application. Whether you are planning a solo trip, a family
            vacation, or a business travel, Trip Blitz can help you find the
            best deals. You can also create your own itinerary, track your
            expenses, and share your travel experiences with your friends.
          </Typography>
        </Grid>
        <Grid item xs={0} sm={6}>
          <Box
            component="img"
            src={familyVacation}
            sx={{ borderRadius: 10, width: "80%", m: "auto", display: "flex" }}
          />
        </Grid>
        <Grid item xs={0} sm={6}>
          <Box
            component="img"
            src={customerService}
            sx={{ borderRadius: 10, width: "80%", m: "auto", display: "flex" }}
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ m: "auto" }}>
          <Typography
            variant="h5"
            sx={{
              p: 5,
              boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
              borderRadius: "50px",
              background: "#ffe5e5",
            }}
          >
            At Trip Blitz, we are committed to providing you with the best
            customer service possible. Our support team is always ready to
            answer any question you may have, and to assist you with any issue
            you may encounter. You can contact us via email, phone, or chat, and
            we will respond as soon as possible.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} sx={{ m: "auto" }}>
          <Typography
            variant="h5"
            sx={{
              p: 5,
              boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
              borderRadius: "50px",
              background: "#ffe5e5",
            }}
          >
            Trip Blitz started as a project by a web development student who
            wanted to create a useful and innovative application for travelers.
            Since then, it has grown into a popular and trusted platform that
            serves thousands of users around the world. We are constantly
            working to improve our features, design, and performance, and to
            offer you the best travel experience possible.
          </Typography>
        </Grid>
        <Grid item xs={0} sm={6}>
          <Box
            component="img"
            src={enjoyVacation}
            sx={{ borderRadius: 10, width: "80%", m: "auto", display: "flex" }}
          />
        </Grid>

        <Typography
          sx={{
            width: { md: "50%" },
            m: "auto",
            mt: 10,
            p: 5,
            boxShadow: "20px 20px 60px #bebebe,-20px -20px 60px #ffffff",
            borderRadius: "50px",
            background: "#ffe5e5",
          }}
          variant="h5"
        >
          Thank you for choosing Trip Blitz as your vacations manager. We hope
          you enjoy using our application, and we look forward to hearing your
          feedback and suggestions. Happy travels!
        </Typography>
      </Grid>
    </Container>
  );
}

export default AboutTripBlitz;
