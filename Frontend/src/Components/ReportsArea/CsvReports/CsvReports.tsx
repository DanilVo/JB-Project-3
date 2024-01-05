import { Button } from '@mui/material';
import './CsvReports.css';
import userService from '../../../Services/UserService';

function CsvReports(): JSX.Element {
  async function handleReportDownload(): Promise<any> {
    await userService.getReports();
  }

  return (
    <div className="CsvReports">
      <Button onClick={handleReportDownload}>Download report</Button>
    </div>
  );
}

export default CsvReports;
