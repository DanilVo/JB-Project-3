import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import VacationModel from "../../../Models/VacationModel";
import "./Chart.css";

function Chart({ vacations }: { vacations: VacationModel[] }): JSX.Element {
  return (
    <Box
      className="Chart"
      sx={{
        mb: 3,
        borderRadius: 1,
        boxShadow: " 5px 5px 22px #acacac,-5px -5px 22px #ffffff;",
        bgcolor: "white",
      }}
    >
      {vacations?.length && (
        <BarChart
          xAxis={[
            {
              data: vacations?.map((v) => v.destination),
              scaleType: "band",
            },
          ]}
          series={[
            {
              data: vacations?.map((v) => v.followersCount),
            },
          ]}
          height={300}
          yAxis={[{ label: "Subscribers" }]}
          tooltip={{ trigger: "item" }}
        />
      )}
    </Box>
  );
}

export default Chart;
