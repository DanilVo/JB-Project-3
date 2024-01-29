import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import notificationService from '../../../Services/NotificationService';
import vacationService from '../../../Services/VacationsService';
import DragDropFileUpload from '../DragDropFileUpload/DragDropFileUpload';
import AddMultipleVacations from '../addMultipleVacations/addMultipleVacations';
import './AddVacation.css';

function AddVacation(): JSX.Element {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<VacationModel>();

  const [previewImage, setPreviewImage] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();

  const [multipleVacations, setMultipleVacations] = useState<VacationModel[]>();

  async function addVacation(vacation: VacationModel) {
    try {
      vacation = {
        ...vacation,
        image: imageToUpload,
        vacationStartDate: moment(vacation?.vacationStartDate).format(
          'YYYY-MM-DD'
        ),
        vacationEndDate: moment(vacation?.vacationEndDate).format('YYYY-MM-DD'),
      };
      if (!vacation.image) {
        notificationService.error('Image field can`t be empty!');
        return;
      }
      await vacationService.addVacation(vacation);
      notificationService.success('Vacation has been successfully added');
      navigate('/home');
    } catch (err: any) {
      notificationService.error(`Couldn't add vacation: ${err.message}`);
    }
  }

  const imageExtract = (file: File) => {
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
      notificationService.error('Not valid file type');
      return;
    }
    setImageToUpload(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <Container>
      <motion.div
        className="Login"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <Typography
          variant="h4"
          color="Highlight"
          align="left"
          marginBottom={3}
        >
          Add vacation:
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(addVacation)}
          sx={{
            m: 'auto',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'left',
                  width: '80%',
                }}
              >
                <TextField
                  required
                  sx={{ mt: 2 }}
                  type="text"
                  label="Destination:"
                  variant="outlined"
                  {...register('destination')}
                />
                <TextField
                  required
                  sx={{ mt: 2, maxWidth: '100%' }}
                  type="text"
                  label="Description:"
                  variant="outlined"
                  multiline
                  {...register('description')}
                />
                <TextField
                  required
                  sx={{ mt: 2 }}
                  type="number"
                  label="Price:"
                  variant="outlined"
                  {...register('price')}
                />
                <TextField
                  required
                  sx={{ mt: 2 }}
                  label="Start Date:"
                  type="date"
                  variant="outlined"
                  focused
                  {...register('vacationStartDate', { valueAsDate: true })}
                />
                <TextField
                  required
                  sx={{ mt: 2 }}
                  label="End Date:"
                  type="date"
                  variant="outlined"
                  focused
                  {...register('vacationEndDate', { valueAsDate: true })}
                />
              </Box>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={12} sm={5}>
              {imageToUpload ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Button
                    variant="outlined"
                    sx={{ width: 'fit-content', m: 'auto' }}
                    color="error"
                    onClick={() => {
                      setImageToUpload(false);
                      setPreviewImage(false);
                    }}
                  >
                    Change Image
                  </Button>
                  <Box
                    component="img"
                    src={previewImage}
                    style={{
                      display: 'flex',
                      margin: 'auto',
                      paddingTop: '15px',
                      height: '300px',
                      width: '380px',
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mt: { sm: 10 },
                  }}
                >
                  <DragDropFileUpload
                    onFileUpload={imageExtract}
                    fileType="image/*"
                  />
                </Box>
              )}
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                mb: 5,
              }}
            >
              <Button variant="outlined" type="submit">
                Save Vacation
              </Button>
              <Divider
                orientation="horizontal"
                variant="fullWidth"
                flexItem
                sx={{ mt: 5 }}
              />
            </Grid>

            <Box
              sx={{
                width: '100%',
              }}
            >
              <Typography
                variant="h4"
                color="Highlight"
                align="left"
                sx={{ mb: 3 }}
              >
                Add multiple vacations at once:
              </Typography>

              <Grid container sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={3}
                    sx={{
                      bgcolor: '#f5f5f5',
                      width: '80%',
                      p: 3,
                      m: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                    }}
                  >
                    <Typography color="text.secondary" variant="body2">
                      Download template or insert existing excel file
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      Fill rows according to columns names
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      To upload image:
                    </Typography>
                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}
                    >
                      <Typography color="text.secondary" variant="body2">
                        I. Press "Insert"
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        II. "Image"
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        III. "Insert into cell"
                      </Typography>
                    </Box>
                    <Typography color="text.secondary" variant="body2">
                      Upload file with extension ".xlsx"
                    </Typography>
                  </Paper>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />

                <Grid item xs={12} sm={5} sx={{ m: 'auto', ml: 2 }}>
                  <AddMultipleVacations />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}

export default AddVacation;
