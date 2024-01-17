import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import VacationModel from '../../../Models/VacationModel';
import notificationService from '../../../Services/NotificationService';
import vacationService from '../../../Services/VacationsService';
import './Chart.css';

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
        width: '90%',
        margin: 'auto',
        border: 1,
        borderRadius: 2,
      }}
    >
      {vacations?.length && (
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: vacations.map((v) => v.destination),
              scaleType: 'band',
            },
          ]}
          series={[
            {
              data: vacations.map((v) => v.followersCount),
            },
          ]}
          height={300}
          yAxis={[{ label: 'Subscribers' }]}
        />
      )}
    </Box>
  );
}

export default Chart;
