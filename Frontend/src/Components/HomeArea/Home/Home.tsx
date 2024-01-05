import { Pagination } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import VacationModel from '../../../Models/VacationModel';
import notificationService from '../../../Services/NotificationService';
import vacationService from '../../../Services/VacationsService';
import MediaCard from '../MediaCard/MediaCard';
import './Home.css';

enum FilterActionTypes {
  myVacations = 'My Vacations',
  yetToStart = 'Yet to start',
  activeNow = 'Active now',
  allVacations = 'All Vacations',
}

function Home({ filterVacations }: { filterVacations: string }): JSX.Element {
  const [initialVacations, setInitialVacations] = useState<VacationModel[]>([]);
  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
    switch (filterVacations) {
      case FilterActionTypes.myVacations:
        const filteredByFollow = initialVacations.filter(
          (v) => v.isFollowing === 1
        );
        setVacations(filteredByFollow);
        break;
      case FilterActionTypes.allVacations:
        setVacations(initialVacations);
        break;

      case FilterActionTypes.activeNow:
        const filteredByActiveVacations = initialVacations.filter((v) => {
          const startDate = new Date(v.vacationStartDate);
          const endDate = new Date(v.vacationEndDate);
          const nowDate = new Date();
          return nowDate > startDate && nowDate < endDate;
        });
        setVacations(filteredByActiveVacations);
        break;

      case FilterActionTypes.yetToStart:
        const filteredByStartSoon = initialVacations.filter((v) => {
          const startDate = new Date(v.vacationStartDate);
          const nowDate = new Date();
          return nowDate < startDate;
        });
        setVacations(filteredByStartSoon);
        break;

      default:
        setVacations(initialVacations);
        break;
    }
  }, [filterVacations]);

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
        setInitialVacations(data);
      })
      .catch((err: any) => notificationService.error(err));
  }, []);

  const deleteVacation = async (vacationId: number) => {
    try {
      if (confirm('Are you sure?')) {
        await vacationService.deleteVacation(vacationId);
        notificationService.success('Vacation has been deleted!');
        const remainingVacation = vacations.filter(
          (vacation) => vacation.vacationId !== vacationId
        );
        setVacations(remainingVacation);
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
      notificationService.success('Vacation has been added!');
    } catch (err: any) {
      notificationService.error(err.message);
    }
  };

  const bottomRef = useRef(null);
  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView();
  };

  return (
    <div className="mainHome">
      <div ref={bottomRef}></div>
      {currentPosts.map((vacation: VacationModel, duration: number) => (
        <MediaCard
          vacation={vacation}
          key={vacation.destination}
          duration={(duration + 2) * 0.1}
          delete={deleteVacation}
          follow={handleFollowVacation}
        />
      ))}
      <div className="pagination">
        <Pagination
          count={2}
          color="primary"
          onChange={handleChange}
          onClick={scrollToBottom}
        />
      </div>
    </div>
  );
}

export default Home;
