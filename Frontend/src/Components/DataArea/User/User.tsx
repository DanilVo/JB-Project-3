import { Button, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import { vacationStore } from "../../../Redux/VacationState";
import notificationService from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationsService";
import "./User.css";

function User(): JSX.Element {
  const { vacationId } = useParams();

  const { register, handleSubmit, setValue } = useForm<VacationModel>();
  const navigate = useNavigate();

  async function editVacation(vacation: VacationModel) {
    try {
      await vacationService.updateVacation(vacation, +vacationId);
      notificationService.success("User has been successfully created");
      navigate(-1);
    } catch (err: any) {
      notificationService.error("Failed to edit vacation: " + err.message);
    }
  }

  const dateParser = (date: Date | string): string => {
    const initialDate = new Date(date);
    const day = initialDate.getDate();
    const month = initialDate.getMonth() + 1;
    const year = initialDate.getFullYear();
    return `${year}-${month < 9 ? "0" : ""}${month}-${day}`;
  };

  useEffect(() => {
    const vacations = vacationStore.getState().vacations;
    const vacation = vacations.find((v) => v.vacationId === +vacationId);

    setValue("destination", vacation.destination);
    setValue("description", vacation.description);
    setValue("price", vacation.price);
    setValue("vacationStartDate", dateParser(vacation.vacationStartDate));
    setValue("vacationEndDate", dateParser(vacation.vacationEndDate));
  }, []);

  return (
    <div className="Edit">
      <motion.div
        className="Login"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        animate={{ y: 100 }}
        transition={{ ease: "easeOut", duration: 1.5 }}
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
            {...register("destination")}
          />
          <TextField
            id="outlined-basic"
            type="text"
            label="Description:"
            variant="outlined"
            multiline
            {...register("description")}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Price:"
            variant="outlined"
            {...register("price")}
          />
          <TextField
            id="outlined-basic"
            label="Start Date:"
            type="date"
            variant="outlined"
            focused
            {...register("vacationStartDate", { valueAsDate: true })}
          />
          <TextField
            id="outlined-basic"
            label="End Date:"
            type="date"
            variant="outlined"
            focused
            {...register("vacationEndDate", { valueAsDate: true })}
          />
          <Button variant="outlined" type="submit">
            Save Changes
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default User;
