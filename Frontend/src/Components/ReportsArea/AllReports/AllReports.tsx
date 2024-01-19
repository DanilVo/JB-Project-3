import { Box, Grid } from '@mui/material';
import Chart from '../Chart/Chart';
import CsvReports from '../CsvReports/CsvReports';
import './AllReports.css';
import DataGrid from '../DataGrid/DataGrid';
import BasicData from '../BasicData/BasicData';
import { useEffect, useState } from 'react';
import VacationModel from '../../../Models/VacationModel';
import vacationService from '../../../Services/VacationsService';
import notificationService from '../../../Services/NotificationService';

function AllReports(): JSX.Element {
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
    <Box className="AllReports" sx={{ ml: 5, mr: 5, mb: 5 }}>
      <CsvReports />
      <Chart vacations={vacations} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <DataGrid vacations={vacations} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <BasicData vacations={vacations} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllReports;
