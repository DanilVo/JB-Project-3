import axios from 'axios';
import {
  VacationAction,
  VacationActionTypes,
  vacationStore,
} from '../Redux/VacationState';
import appConfig from '../Utils/AppConfig';
import VacationModel from '../Models/VacationModel';
import notificationService from './NotificationService';

class VacationService {
  public async getAllVacations(): Promise<VacationModel[]> {
    try {
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
    } catch (err: any) {
      notificationService.error(`Couldn't get vacations: ${err.message}`);
    }
  }

  public async deleteVacation(id: number): Promise<void> {
    try {
      await axios.delete(appConfig.deleteVacationUrl + id);
      const action: VacationAction = {
        type: VacationActionTypes.DeleteVacation,
      };
      vacationStore.dispatch(action);
    } catch (err: any) {
      notificationService.error(`Couldn't delete vacation: ${err.message}`);
    }
  }

  public async updateVacation(
    vacation: VacationModel,
    vacationId: number
  ): Promise<void> {
    try {
      const options = {
        headers: { 'Content-Type': 'multipart/form-data' },
      };
      const response = await axios.put(
        appConfig.updateVacationUrl + vacationId,
        vacation,
        options
      );
      const action: VacationAction = {
        type: VacationActionTypes.UpdateVacation,
        payload: response.data,
      };
      vacationStore.dispatch(action);
    } catch (err: any) {
      notificationService.error(`Couldn't update vacation: ${err.message}`);
    }
  }
}

const vacationService = new VacationService();

export default vacationService;
