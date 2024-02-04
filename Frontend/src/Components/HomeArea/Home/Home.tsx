import { Box, Container, Pagination, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { vacationStore } from "../../../Redux/VacationState";
import notificationService from "../../../Services/NotificationService";
import vacationService from "../../../Services/VacationsService";
import MediaCard from "../MediaCard/MediaCard";
import "./Home.css";

enum FilterActionTypes {
  myVacations = "My-Vacations",
  yetToStart = "Yet-to-start",
  activeNow = "Active-now",
  allVacations = "All-vacations",
}

function Home({ filterVacations }: { filterVacations: string }): JSX.Element {
  const [initialVacations, setInitialVacations] = useState<VacationModel[]>([]);
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  const [paginationPagesCount, setPaginationPagesCount] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 9;

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = vacations.slice(firstPostIndex, lastPostIndex);  

  useEffect(() => {
    vacationService
      .getAllVacations()
      .then((data) => {
        setInitialVacations(data);
        setVacations(data);        
        setPaginationPagesCount(Math.ceil(data.length / postsPerPage));
      })
      .catch((err: any) => notificationService.error(err));
  }, []);

  useEffect(() => {
    switch (filterVacations) {
      case FilterActionTypes.myVacations:
        const filteredByFollow = initialVacations.filter(
          (v) => v.isFollowing === 1
        );
        setPaginationPagesCount(
          Math.ceil(filteredByFollow.length / postsPerPage)
        );
        setVacations(filteredByFollow);
        break;

      case FilterActionTypes.allVacations:
        setPaginationPagesCount(
          Math.ceil(initialVacations.length / postsPerPage)
        );
        setVacations(initialVacations);
        break;

      case FilterActionTypes.activeNow:
        const filteredByActiveVacations = initialVacations.filter((v) => {
          const startDate = new Date(v.vacationStartDate);
          const endDate = new Date(v.vacationEndDate);
          const nowDate = new Date();
          return nowDate > startDate && nowDate < endDate;
        });
        setPaginationPagesCount(
          Math.ceil(filteredByActiveVacations.length / postsPerPage)
        );
        setVacations(filteredByActiveVacations);
        break;

      case FilterActionTypes.yetToStart:
        const filteredByStartSoon = initialVacations.filter((v) => {
          const startDate = new Date(v.vacationStartDate);
          const nowDate = new Date();
          return nowDate < startDate;
        });
        setPaginationPagesCount(
          Math.ceil(filteredByStartSoon.length / postsPerPage)
        );
        setVacations(filteredByStartSoon);
        break;

      default:
        setVacations(vacationStore.getState().vacations);
        break;
    }
  }, [filterVacations]);

  const deleteVacation = async (vacationId: number) => {
    try {
      if (confirm("Are you sure?")) {
        await vacationService.deleteVacation(vacationId);
        notificationService.success("Vacation has been deleted!");
        const remainingVacation = vacations.filter(
          (vacation) => vacation.vacationId !== vacationId
        );
        setVacations(remainingVacation);
        setPaginationPagesCount(
          Math.ceil(vacations.length / postsPerPage)
        );
      }
    } catch (err: any) {
      notificationService.error(err.message);
    }
  };

  const handleFollowVacation = async (
    vacationId: number,
    isFollowing: number
  ) => {
    try {
      await vacationService.followVacation(vacationId, isFollowing);
      notificationService.success(
        !isFollowing ? "Vacation has been added!" : "Vacation has been removed!"
      );
    } catch (err: any) {
      notificationService.error(err.message);
    }
  };

  const bottomRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView();
  };

  const handleChange = (_e: React.ChangeEvent<unknown>, p: number) => {
    setCurrentPage(p);
  };

  const noVacations = (
    <Container>
      <Typography variant="h4" color="primary">
        NO MATCHES FOUND
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Please try another search.
      </Typography>
    </Container>
  );

  return (
    <Container className="mainHome">
      {vacations.length ? (
        <>
          <span ref={bottomRef}></span>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {currentPosts.map((vacation: VacationModel, index: number) => (
              <MediaCard
                vacation={vacation}
                key={vacation.vacationUuid}
                duration={(index + 2) * 0.1}
                delete={deleteVacation}
                follow={handleFollowVacation}
              />
            ))}
          </Box>
          <Box>
            <Pagination
              sx={{ width: "fit-content", m: "auto", mb: 1, mt: 1 }}
              count={paginationPagesCount}
              color="primary"
              onChange={handleChange}
              onClick={scrollToBottom}
            />
          </Box>
        </>
      ) : (
        noVacations
      )}
    </Container>
  );
}

export default Home;
