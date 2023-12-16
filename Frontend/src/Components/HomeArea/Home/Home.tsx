import { useEffect, useState } from 'react';
import VacationModel from '../../../Models/VacationModel';
import notificationService from '../../../Services/NotificationService';
import vacationService from '../../../Services/VacationsService';
import MediaCard from '../MediaCard/MediaCard';
import './Home.css';

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
      {vacations.slice(0, 9).map((vacation: VacationModel) => (
        <MediaCard vacation={vacation} />
      ))}
    </div>
  );
}

export default Home;
