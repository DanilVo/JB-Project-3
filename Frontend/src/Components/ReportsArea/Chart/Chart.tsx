import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { vacationStore } from '../../../Redux/VacationState';
import './Chart.css';
import { useEffect, useState } from 'react';
import vacationService from '../../../Services/VacationsService';
import notificationService from '../../../Services/NotificationService';
import VacationModel from '../../../Models/VacationModel';

function Chart(): JSX.Element {
  // const vacations = vacationStore.getState().vacations;
  const [vacations, setVacations] = useState<VacationModel[]>([]);
  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((data) => {
        setVacations(data);
      })
      .catch((err: any) => notificationService.error(err));
  }, []);

  console.log(vacations);

  return (
    <Box className="Chart" sx={{ width: '100%' }}>
      {vacations?.length && (
        <BarChart
          xAxis={[
            {
              id: 'barCategories',
              data: vacations.map((v) => v.destination),
              scaleType: 'band',
              dataKey: 'subs',
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
