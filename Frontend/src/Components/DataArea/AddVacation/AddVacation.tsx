import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import notificationService from '../../../Services/NotificationService';
import vacationService from '../../../Services/VacationsService';
import './AddVacation.css';

function AddVacation(): JSX.Element {
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState<any>();
  const [imageToUpload, setImageToUpload] = useState<any>();
  const { register, handleSubmit } = useForm<VacationModel>();

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

  async function addVacation(vacation: VacationModel) {
    try {
      vacation = {
        ...vacation,
        image: (imageToUpload as unknown as FileList)[0],
        vacationStartDate: dateParser(vacation.vacationStartDate),
        vacationEndDate: dateParser(vacation.vacationEndDate),
      };
      await vacationService.addVacation(vacation);
      notificationService.success('Vacation has been successfully added');
      navigate(-1);
    } catch (err: any) {
      notificationService.error(`Couldn't add vacation: ${err.message}`);
    }
  }

  const imageExtract = (e: any) => {
    setImageToUpload(e.target.files);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <Container className="Edit">
      <motion.div
        className="Login"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ ease: 'easeOut', duration: 2 }}
      >
        <Typography variant="h4" color="Highlight" align="center">
          Add vacation:
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(addVacation)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            maxWidth: '80%',
            m: 'auto',
          }}
        >
          <TextField
            sx={{ mt: 2 }}
            type="text"
            label="Destination:"
            variant="outlined"
            {...register('destination')}
          />
          <TextField
            sx={{ mt: 2 }}
            type="text"
            label="Description:"
            variant="outlined"
            multiline
            {...register('description')}
          />
          <TextField
            sx={{ mt: 2 }}
            type="number"
            label="Price:"
            variant="outlined"
            {...register('price')}
          />
          <TextField
            sx={{ mt: 2 }}
            label="Start Date:"
            type="date"
            variant="outlined"
            focused
            {...register('vacationStartDate', { valueAsDate: true })}
          />
          <TextField
            sx={{ mt: 2 }}
            label="End Date:"
            type="date"
            variant="outlined"
            focused
            {...register('vacationEndDate', { valueAsDate: true })}
          />

          <img src={previewImage} style={{ height: '200px' }} />
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
              {...register('image')}
            />
          </Button>
          <Button variant="outlined" type="submit">
            Save Changes
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
}

export default AddVacation;
