import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { vacationStore } from "../../../Redux/VacationState";
import "./Chart.css";

function Chart(): JSX.Element {
  const vacations = vacationStore.getState().vacations;
  return (
    <Box className="Chart" sx={{ width: "100%" }}>
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
    </Box>
  );
}

export default Chart;
