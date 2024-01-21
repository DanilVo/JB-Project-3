import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import notificationService from '../../../Services/NotificationService';
import vacationService from '../../../Services/VacationsService';
import './EditVacation.css';

function EditVacation(): JSX.Element {
  const { vacationUuid } = useParams();

  const [vacation, setVacation] = useState<VacationModel>();
  const [isData, setIsData] = useState<boolean>(false);

  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((data) => {
        setVacation(data.find((v) => v.vacationUuid === vacationUuid));
        setIsData(!isData);
      })
      .catch((err: any) => notificationService.error(err));
  }, []);

  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const { register, handleSubmit, setValue } = useForm<VacationModel>();

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const dateParser = (date: Date | string): string => {
    const initialDate = new Date(date);
    const day = initialDate.getDate();
    const month = initialDate.getMonth() + 1;
    const year = initialDate.getFullYear();
    return `${year}-${month < 9 ? '0' : ''}${month}-${
      day < 9 ? '0' : ''
    }${day}`;
  };

  useEffect(() => {
    setPreviewImage(vacation?.vacationImageUrl);
    setImageToUpload(vacation?.vacationImageUrl);
    setValue('destination', vacation?.destination);
    setValue('description', vacation?.description);
    setValue('price', vacation?.price);
    setValue('vacationStartDate', dateParser(vacation?.vacationStartDate));
    setValue('vacationEndDate', dateParser(vacation?.vacationEndDate));
    setValue('vacationImageUrl', vacation?.vacationImageUrl);
  }, [isData]);

  async function editVacation(updatedVacation: VacationModel) {
    try {
      updatedVacation = {
        ...updatedVacation,
        vacationUuid: vacationUuid,
        followersCount: vacation.followersCount,
        isFollowing: vacation.isFollowing,
        vacationId: +vacation.vacationId,
        image: (imageToUpload as unknown as FileList)[0],
      };

      await vacationService.updateVacation(
        updatedVacation,
        vacation.vacationId
      );
      notificationService.success('Vacation has been successfully updated');
      navigate(-1);
    } catch (err: any) {
      notificationService.error('Failed to edit vacation: ' + err.message);
    }
  }

  const imageExtract = (e: React.FormEvent<HTMLInputElement>) => {
    setImageToUpload(e.currentTarget.files);
    setPreviewImage(URL.createObjectURL(e.currentTarget.files[0]));
  };

  return (
    <Container className="Edit">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Typography variant="h4" color="Highlight" align="center">
          Edit:
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
                  alignItems: "center",
                  width: "100%",
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
                  sx={{ mt: 2, maxWidth: "67%" }}
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

            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={previewImage}
                  style={{
                    marginTop: "10px",
                    height: "200px",
                    borderRadius: 10,
                    marginBottom: 10,
                  }}
                />
                <Button
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload image
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onInput={imageExtract}
                    {...register("image")}
                  />
                </Button>
              </Box>
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
