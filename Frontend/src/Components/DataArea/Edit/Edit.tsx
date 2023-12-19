import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./Edit.css";
import { motion } from "framer-motion";
import { Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";
import VacationModel from "../../../Models/VacationModel";
import { useEffect } from "react";
import { vacationStore } from "../../../Redux/VacationState";

function Edit(): JSX.Element {
  const { vacationId } = useParams();

  const { register, handleSubmit,setValue } = useForm<VacationModel>();
  const navigate = useNavigate();

  async function registerNewUser(vacation: VacationModel) {
    try {
    //   await authService.register(credentials);
    //   notificationService.success("User has been successfully created");
      navigate(-1);
    } catch (err: any) {
      notificationService.error(err.message);
    }
  }

  useEffect(()=>{
    const vacations = vacationStore.getState().vacations 
    const vacation = vacations.find(v=>v.vacationId === +vacationId);
    const start = new Date(vacation.vacationStartDate).toLocaleDateString(
      "en-GB"
    );
    const end = new Date(vacation.vacationStartDate).toLocaleDateString(
      "en-GB"
    );
    const newDate = Date.parse(start)
    console.log(vacation.vacationStartDate);
    
     
    setValue("destination",vacation.destination)
    setValue("description",vacation.description)
    setValue("price",vacation.price)
    // setValue("vacationStartDate",start)
    // setValue("vacationEndDate", end);
})

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
        <form onSubmit={handleSubmit(registerNewUser)}>
          <TextField
            id="outlined-basic"
            type="text"
            label="Destination:"
            variant="outlined"
            required
            {...register("destination")}
          />
          <TextField
            id="outlined-basic"
            type="text"
            label="Description:"
            variant="outlined"
            required
            {...register("description")}
          />
          <TextField
            id="outlined-basic"
            type="number"
            label="Price:"
            variant="outlined"
            required
            {...register("price")}
          />
          <TextField
            id="outlined-basic"
            label="Start Date:"
            type="date"
            variant="outlined"
            minLength="4"
            required
            focused
            {...register("vacationStartDate", { valueAsDate: true })}
          />
          <TextField
            id="outlined-basic"
            label="End Date:"
            type="date"
            variant="outlined"
            minLength="4"
            required
            focused
            {...register("vacationEndDate", { valueAsDate: true })}
          />
          <Button variant="outlined" type="submit">
            Register
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default Edit;
