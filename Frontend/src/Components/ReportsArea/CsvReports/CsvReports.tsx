import { Box, Button } from '@mui/material';
import UserModel from '../../../Models/UserModel';
import { authStore } from '../../../Redux/AuthState';
import notificationService from '../../../Services/NotificationService';
import userService from '../../../Services/UserService';
import './CsvReports.css';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';

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
    <Box
      className="CsvReports"
      sx={{ display: 'flex', justifyContent: 'end' }}
    >
      <Button
        endIcon={<AssessmentOutlinedIcon />}
        onClick={handleReportDownload}
      >
        Download report
      </Button>
    </Box>
  );
}

export default CsvReports;
