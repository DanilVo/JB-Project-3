import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import notificationService from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationsService";
import MediaCard from "../MediaCard/MediaCard";
import "./Home.css";
import { Pagination } from "@mui/material";

function Home(): JSX.Element {
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  const [currentPage, setCurrentPAge] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(9);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = vacations.slice(firstPostIndex, lastPostIndex);

  const handleChange = (_e: any, p: number) => {
    setCurrentPAge(p);
  };

  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((data) => {
        setVacations(data);
      })
      .catch((err: any) => notificationService.error(err));
  }, []);

  const deleteVacation = async (id: number) => {
    try {
      if (confirm("Are you sure?")) {
        await vacationService.deleteVacation(id);
        notificationService.success("Vacation has been deleted!");
        const remainingVacation = vacations.filter(
          (vacation) => vacation.vacationId !== id
        );
        setVacations(remainingVacation);
      }
    } catch (err: any) {
      notificationService.error(err.message);
    }
  };
  return (
    <div className="mainHome">
      {currentPosts.map((vacation: VacationModel, i: number) => (
        <MediaCard
          vacation={vacation}
          key={vacation.destination}
          duration={(i + 2) * 0.1}
          delete={deleteVacation}
        />
      ))}
      <div className="pagination">
        <Pagination count={2} color="primary" onChange={handleChange} />
      </div>
    </div>
  );
}

export default Home;
