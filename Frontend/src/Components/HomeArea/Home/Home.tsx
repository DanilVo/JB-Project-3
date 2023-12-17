import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import notificationService from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationsService";
import MediaCard from "../MediaCard/MediaCard";
import "./Home.css";
import { Pagination } from "@mui/material";

function Home(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((data) => setVacations(data))
      .catch((err: any) => notificationService.error(err));
  }, []);

  return (
    <div className="Home">
      {vacations.map((vacation: VacationModel) => (
        <MediaCard vacation={vacation} key={vacation.destination} />
      ))}
      <Pagination count={2}/>
    </div>
  );
}

export default Home;
