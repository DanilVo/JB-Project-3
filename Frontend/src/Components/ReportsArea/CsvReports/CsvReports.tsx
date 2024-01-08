import { Button } from '@mui/material';
import './CsvReports.css';
import userService from '../../../Services/UserService';
import UserModel from '../../../Models/UserModel';
import { authStore } from '../../../Redux/AuthState';

function CsvReports(): JSX.Element {
  async function handleReportDownload(): Promise<any> {
    const user:UserModel = authStore.getState().user
    await userService.getReports(user.userId);
  }

  return (
    <div className="CsvReports">
      <Button onClick={handleReportDownload}>Download report</Button>
    </div>
  );
}

export default CsvReports;
