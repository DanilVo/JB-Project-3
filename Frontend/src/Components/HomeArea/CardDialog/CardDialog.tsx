import {
  Box,
  Typography,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  ButtonGroup,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CardDialog.css';
import VacationModel from '../../../Models/VacationModel';
import moment from 'moment';
import notificationService from '../../../Services/NotificationService';
import gptService from '../../../Services/GptService';

interface Props {
  vacationUuid: string;
  children: any;
  vacation: VacationModel;
}

function CardDialog(props: Props): JSX.Element {
  const navigate = useNavigate();
  const [openCard, setOpenCard] = useState<boolean>(false);
  const [answer, setAnswer] = useState<string[]>([]);
  const [progress, setProgress] = useState<boolean>(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const vacationStartDate = moment(props.vacation.vacationStartDate).format(
    'MMM-DD-YY'
  );
  const vacationEndDate = moment(props.vacation.vacationEndDate).format(
    'MMM-DD-YY'
  );

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    try {
      setProgress(true);
      const prompt = e.currentTarget.getAttribute('value');
      const gptAnswer = await gptService.gptAnswer(prompt);
      splitText(gptAnswer);
    } catch (err: any) {
      notificationService.error(err.message);
    } finally {
      setProgress(false);
    }
  };

  const splitText = (text: string) => {
    const lines = text.split('\n').filter((line) => line.trim() !== '');
    setAnswer(lines);
    // return lines.forEach((line, index) => {
    //   <Typography>
    //     (`${index + 1}. ${line}`)
    //   </Typography>;
    // });
  };

  return (
    <>
      <Box
        onClick={() => {
          setOpenCard(!openCard);
          navigate(`/home/vacation-card/${props.vacationUuid}`);
        }}
        sx={{ cursor: 'pointer' }}
      >
        {props.children}
      </Box>
      <Dialog
        aria-labelledby="responsive-dialog-title"
        aria-describedby="alert-dialog-description"
        open={openCard}
        onClose={() => {
          setOpenCard(!openCard);
          navigate(-1);
        }}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="lg"
      >
        <DialogTitle id="responsive-dialog-title">
          {props.vacation.destination}
        </DialogTitle>
        <DialogContent
          sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}
        >
          <Box
            component="img"
            src={props.vacation.vacationImageUrl}
            sx={{ width: { xs: '100%', sm: '50%' } }}
            width="50%"
            maxHeight="400px"
          />
          <Container>
            <DialogContentText id="alert-dialog-description">
              <Typography>{props.vacation.description}</Typography>
              <Typography>
                Vacation dates: {vacationStartDate} - {vacationEndDate}
              </Typography>
              <Typography>Price: {props.vacation.price}$</Typography>
            </DialogContentText>
            <Box sx={{ border: '1px solid blue', height: 'fit-content', p: 1 }}>
              <Container>
                <Typography variant="h4" color="blue">
                  Try out BlitzGpt:
                </Typography>
                <ButtonGroup sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: 'sm' }}
                    value={`Where to eat in ${props.vacation.destination}?`}
                    onClick={handleClick}
                  >
                    Where to eat?
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: 'sm' }}
                    value={`What to see in ${props.vacation.destination}?`}
                    onClick={handleClick}
                  >
                    What to see?
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ fontSize: 'sm' }}
                    value={`What to do in ${props.vacation.destination}?`}
                    onClick={handleClick}
                  >
                    What to do?
                  </Button>
                </ButtonGroup>
                <Paper
                  sx={{ minHeight: '150px',maxHeight:'300px', mt: 1, p: 1, overflowX: 'hidden' }}
                >
                  {progress ? (
                    <CircularProgress
                      color="inherit"
                      sx={{
                        display: 'flex',
                        m: 'auto',
                      }}
                    />
                  ) : (
                    answer.map((line, index) => (
                      <Typography key={index}>{`${line}`}</Typography>
                    ))
                  )}
                </Paper>
              </Container>
            </Box>
          </Container>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenCard(!openCard);
              navigate(-1);
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CardDialog;
