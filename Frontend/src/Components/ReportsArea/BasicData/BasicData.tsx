import { Box, Container, Divider, Typography } from "@mui/material";
import VacationModel from "../../../Models/VacationModel";
import "./BasicData.css";

function BasicData({ vacations }: { vacations: VacationModel[] }): JSX.Element {
    
  const activeVacations = vacations.filter((v) => {
    const startDate = new Date(v.vacationStartDate);
    const endDate = new Date(v.vacationEndDate);
    const nowDate = new Date();
    return nowDate > startDate && nowDate < endDate;
  });

  const vacationsIsThisYear = vacations.filter(
    (v) =>
      new Date(v.vacationStartDate).getFullYear() === new Date().getFullYear()
  );

  const finishedVacations = vacations.filter(
    (v) =>
      new Date(v.vacationStartDate).getFullYear() < new Date().getFullYear()
  );

  return (
    <Container
      sx={{
        p: 1,
        bgcolor: "white",
        height: "100%",
        borderRadius: 1,
        boxShadow: "11px 11px 22px #acacac,-11px -11px 22px #ffffff;",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Box>
        <Typography color="primary" sx={{ typography: { md: "h4", sm: "h5" } }}>
          Currently:
        </Typography>
        <Typography component="p" variant="body1" color="text.secondary">
          <b>{activeVacations.length}</b> Vacations running
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography color="primary" sx={{ typography: { md: "h4", sm: "h5" } }}>
          Future vacations:
        </Typography>
        <Typography component="p" variant="body1" color="text.secondary">
          <b>{vacationsIsThisYear.length}</b> Vacations planned this year
        </Typography>
      </Box>
      <Divider />
      <Box>
        <Typography color="primary" sx={{ typography: { md: "h4", sm: "h5" } }}>
          Till today:
        </Typography>
        <Typography component="p" variant="body1" color="text.secondary">
          <b>{finishedVacations.length}</b> Successfully finished vacations
        </Typography>
      </Box>
    </Container>
  );
}

export default BasicData;
