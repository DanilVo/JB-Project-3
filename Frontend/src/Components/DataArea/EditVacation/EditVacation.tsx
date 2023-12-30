import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import VacationModel from '../../../Models/VacationModel';
import { vacationStore } from '../../../Redux/VacationState';
import notificationService from '../../../Services/NotificationService';
import vacationService from '../../../Services/VacationsService';
import './EditVacation.css';

function EditVacation(): JSX.Element {
  const { vacationUuid } = useParams();

  const vacationsFromStore = vacationStore.getState().vacations;

  const currentVacation = vacationsFromStore.find(
    (v) => v.vacationUuid === vacationUuid
  );

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
    setPreviewImage(currentVacation.vacationImageUrl);
    setImageToUpload(currentVacation.vacationImageUrl);
    setValue('destination', currentVacation.destination);
    setValue('description', currentVacation.description);
    setValue('price', currentVacation.price);
    setValue(
      'vacationStartDate',
      dateParser(currentVacation.vacationStartDate)
    );
    setValue('vacationEndDate', dateParser(currentVacation.vacationEndDate));
    setValue('vacationImageUrl', currentVacation.vacationImageUrl);
  }, []);

  async function editVacation(vacation: VacationModel) {
    try {
      vacation.vacationUuid = vacationUuid;
      vacation.followersCount = currentVacation.followersCount;
      vacation.isFollowing = currentVacation.isFollowing;
      vacation.vacationId = +currentVacation.vacationId;
      vacation.image = (imageToUpload as unknown as FileList)[0];
      
      await vacationService.updateVacation(
        vacation,
        currentVacation.vacationId
      );

      notificationService.success('Vacation has been successfully updated');
      navigate(-1);
    } catch (err: any) {
      notificationService.error('Failed to edit vacation: ' + err.message);
    }
  }

  const imageExtract = (e: any) => {
    setImageToUpload(e.target.files);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="Edit">
      <motion.div
        className="Login"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: 100 }}
        transition={{ ease: 'easeOut', duration: 1.5 }}
      >
        <Typography variant="h4" color="Highlight" align="center">
          Edit:
        </Typography>
        <form onSubmit={handleSubmit(editVacation)}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Destination:"
            variant="outlined"
            {...register('destination')}
          />
          <TextField
            id="outlined-basic"
            type="text"
            label="Description:"
            variant="outlined"
            multiline
            {...register('description')}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Price:"
            variant="outlined"
            {...register('price')}
          />
          <TextField
            id="outlined-basic"
            label="Start Date:"
            type="date"
            variant="outlined"
            focused
            {...register('vacationStartDate', { valueAsDate: true })}
          />
          <TextField
            id="outlined-basic"
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
        </form>
      </motion.div>
    </div>
  );
}

export default EditVacation;
