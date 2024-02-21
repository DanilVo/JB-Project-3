import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { motion } from 'framer-motion';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import notificationService from '../../../Services/NotificationService';
import vacationService from '../../../Services/VacationsService';
import DragDropFileUpload from '../DragDropFileUpload/DragDropFileUpload';
import './EditVacation.css';
import useTitle from '../../../Utils/useTitle';

interface ErrorMessages {
  [key: string]: string;
}

function EditVacation(): JSX.Element {
  useTitle('Edit vacation');

  const { vacationUuid } = useParams();
  const navigate = useNavigate();

  const [vacation, setVacation] = useState<VacationModel>();
  const [isData, setIsData] = useState<boolean>(false);

  const [previewImage, setPreviewImage] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const { register, handleSubmit, setValue } = useForm<VacationModel>();

  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((data) => {
        setVacation(data.find((v) => v.vacationUuid === vacationUuid));
        setIsData(!isData);
      })
      .catch((err: any) => notificationService.error(err.message));
  }, []);

  useEffect(() => {
    setPreviewImage(vacation?.vacationImageUrl);
    setImageToUpload(vacation?.vacationImageUrl);
    setValue('destination', vacation?.destination);
    setValue('description', vacation?.description);
    setValue('price', vacation?.price);
    setValue(
      'vacationStartDate',
      moment(vacation?.vacationStartDate).format('YYYY-MM-DD')
    );
    setValue(
      'vacationEndDate',
      moment(vacation?.vacationEndDate).format('YYYY-MM-DD')
    );
    setValue('vacationImageUrl', vacation?.vacationImageUrl);
  }, [isData]);

  async function editVacation(updatedVacation: VacationModel) {
    try {
      updatedVacation = {
        ...updatedVacation,
        vacationStartDate: moment(updatedVacation.vacationStartDate).format(
          'YYYY-MM-DD'
        ),
        vacationEndDate: moment(updatedVacation.vacationEndDate).format(
          'YYYY-MM-DD'
        ),
        vacationUuid: vacationUuid,
        followersCount: vacation.followersCount,
        isFollowing: vacation.isFollowing,
        vacationId: +vacation.vacationId,
        image: imageToUpload,
      };

      await vacationService.updateVacation(
        updatedVacation,
        vacation.vacationId
      );
      notificationService.success('Vacation has been successfully updated');
      navigate('/home');
    } catch (err: any) {
      const errorMessages: ErrorMessages = {
        now: "Start date must be greater than now",
        destination: "Missing destination field",
        description: "Missing description field",
        price: "Missing price field",
      };

      Object.keys(errorMessages).forEach((fieldName) => {
        if (err.response.data.includes(fieldName)) {
          notificationService.error(errorMessages[fieldName]);
        }
      });
    }
  }

  const imageExtract = (file: File) => {
    const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
      notificationService.error('File format is not valid');
      return;
    }
    setImageToUpload(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  return (
    <Container className="Edit">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Typography
          variant="h4"
          color="Highlight"
          align="center"
          marginBottom={3}
        >
          Edit vacation:
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(editVacation)}
          sx={{
            m: "auto",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "left",
                  width: "80%",
                }}
              >
                <TextField
                  required
                  sx={{ mt: 2 }}
                  type="text"
                  label="Destination:"
                  variant="outlined"
                  {...register("destination")}
                />
                <TextField
                  required
                  sx={{ mt: 2, maxWidth: "100%" }}
                  type="text"
                  label="Description:"
                  variant="outlined"
                  multiline
                  {...register("description")}
                />
                <TextField
                  required
                  sx={{ mt: 2 }}
                  type="number"
                  label="Price:"
                  inputProps={{ min: 0, max: 10000 }}
                  variant="outlined"
                  {...register("price")}
                />
                <TextField
                  required
                  sx={{ mt: 2 }}
                  label="Start Date:"
                  type="date"
                  variant="outlined"
                  focused
                  {...register("vacationStartDate", { valueAsDate: true })}
                />
                <TextField
                  required
                  sx={{ mt: 2 }}
                  label="End Date:"
                  type="date"
                  variant="outlined"
                  focused
                  {...register("vacationEndDate", { valueAsDate: true })}
                />
              </Box>
            </Grid>
            <Divider orientation="vertical" variant="middle" flexItem />
            <Grid item xs={12} sm={5}>
              {imageToUpload ? (
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Button
                    variant="outlined"
                    sx={{ width: "fit-content", m: "auto" }}
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
                      display: "flex",
                      margin: "auto",
                      paddingTop: "15px",
                      height: "300px",
                      width: "380px",
                    }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
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
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button variant="outlined" type="submit">
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Box>
      </motion.div>
    </Container>
  );
}

export default EditVacation;
