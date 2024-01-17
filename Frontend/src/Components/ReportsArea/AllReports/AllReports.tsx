import { Box } from '@mui/material';
import Chart from '../Chart/Chart';
import CsvReports from '../CsvReports/CsvReports';
import './AllReports.css';
import DataGrid from '../DataGrid/DataGrid';

function AllReports(): JSX.Element {
  return (
    <Box className="AllReports">
      <CsvReports />
      <Chart />
      <DataGrid/>
    </Box>
  );
}

export default AllReports;
