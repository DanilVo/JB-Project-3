import { Box, Button, Typography } from '@mui/material';
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
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: 1,
        boxShadow: '11px 11px 22px #acacac,-11px -11px 22px #ffffff;',
        bgcolor: 'white',
        mb: 3,
      }}
    >
      <Typography variant="h6" color="primary" padding={1}>
        Dashboard:
      </Typography>
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
