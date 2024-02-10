import { Box, Container, Grid, Typography } from "@mui/material";
import "./PageNotFound.css";
import notFoundImage from "../../../assets/images/images_near_texts/bg-404.png";
function PageNotFound(): JSX.Element {
  return (
    <Container>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", sm: "row" },
        }}
      >
        <Grid item xs={12} sm={6}>
          <Box component="img" src={notFoundImage} alt="404" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={{ mt: { xs: 0, sm: 20 }, ml: { xs: 10, sm: 5 } }}>
            <Typography
              fontWeight="bold"
              color="primary"
              variant="h3"
              fontSize="7rem"
            >
              404
            </Typography>
            <Typography color="text.secondary" variant="body1" fontSize="1rem">
              Oops, something went wrong. But don't worry, we're on it. In the
              meantime, you can go back to our homepage or explore some of our
              latest vacations.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default PageNotFound;
