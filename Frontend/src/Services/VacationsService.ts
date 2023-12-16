import axios from 'axios';
import appConfig from '../Utils/AppConfig';

class VacationService {
  public async getAllVacations() {
    const { data } = await axios.get(appConfig.allVacations);
    return data;
  }
}

const vacationService = new VacationService();

export default vacationService;
