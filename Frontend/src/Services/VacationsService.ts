import axios from "axios";
import {
  VacationAction,
  VacationActionTypes,
  vacationStore,
} from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";
import VacationModel from "../Models/VacationModel";

class VacationService {
  public async getAllVacations(): Promise<VacationModel[]> {
    let vacations = vacationStore.getState().vacations;
 
    if (vacations.length === 0) {
      const response = await axios.get(appConfig.allVacationsUrl);

      vacations = response.data;

      const action: VacationAction = {
        type: VacationActionTypes.SetVacations,
        payload: vacations,
      };
      vacationStore.dispatch(action);
    }
    return vacations;
  }
}

const vacationService = new VacationService();

export default vacationService;
