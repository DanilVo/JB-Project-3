import { Button } from '@mui/material';
import './CsvReports.css';
import userService from '../../../Services/UserService';
import UserModel from '../../../Models/UserModel';
import { authStore } from '../../../Redux/AuthState';
import notificationService from '../../../Services/NotificationService';

function CsvReports(): JSX.Element {
  async function handleReportDownload(): Promise<any> {
    const user: UserModel = authStore.getState().user;
    try {
      await userService.getReports(user.userId);
    } catch (err: any) {
      notificationService.error(`Error downloading file: ${err.message}`);
    }
  }

  return (
    <div className="CsvReports">
      <Button onClick={handleReportDownload}>Download report</Button>
    </div>
  );
}

export default CsvReports;
