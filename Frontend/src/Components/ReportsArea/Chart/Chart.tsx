import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import notificationService from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationsService";
import "./Chart.css";

function Chart(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((data) => {
        setVacations(data);
      })
      .catch((err: any) =>
        notificationService.error(`Couldn't get vacations: ${err.message}`)
      );
  }, []);

  return (
    <Box
      className="Chart"
      sx={{
        width: "90%",
        margin: "auto",
        borderRadius:2,
        boxShadow:
          "0px 2px 1px -1px rgba(0,0,0,0.2),\
           0px 1px 1px 0px rgba(0,0,0,0.14),\
           0px 1px 3px 0px rgba(0,0,0,0.12)",
        bgcolor: "white",
      }}
    >
      {vacations?.length && (
        <BarChart
          xAxis={[
            {
              id: "barCategories",
              data: vacations.map((v) => v.destination),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: vacations.map((v) => v.followersCount),
            },
          ]}
          height={300}
          yAxis={[{ label: "Subscribers" }]}
        />
      )}
    </Box>
  );
}

export default Chart;
