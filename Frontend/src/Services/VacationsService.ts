import axios from 'axios';
import VacationModel from '../Models/VacationModel';
import { authStore } from '../Redux/AuthState';
import { userStore } from '../Redux/UserState';
import {
  VacationAction,
  VacationActionTypes,
  vacationStore,
} from '../Redux/VacationState';
import appConfig from '../Utils/AppConfig';
import notificationService from './NotificationService';

class VacationService {
  private options = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  public async getAllVacations(): Promise<VacationModel[]> {
    try {
      let vacations = vacationStore.getState().vacations;

      if (vacations.length === 0) {
        const userId = authStore.getState().user.userId;
        const response = await axios.get(appConfig.allVacationsUrl + userId);

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

  public async deleteVacation(vacationId: number): Promise<void> {
    try {
      await axios.delete(appConfig.deleteVacationUrl + vacationId);
      const action: VacationAction = {
        type: VacationActionTypes.DeleteVacation,
        payload: vacationId,
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
      const response = await axios.put(
        appConfig.updateVacationUrl + vacationId,
        vacation,
        this.options
      );

      response.data.followersCount = vacation.followersCount;
      response.data.isFollowing = vacation.isFollowing;

      const action: VacationAction = {
        type: VacationActionTypes.UpdateVacation,
        payload: response.data,
      };

      vacationStore.dispatch(action);
    } catch (err: any) {
      notificationService.error(`Couldn't update vacation: ${err.message}`);
    }
  }

  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    try {
      const response = await axios.post(
        appConfig.addVacationUrl,
        vacation,
        this.options
      );

      const action: VacationAction = {
        type: VacationActionTypes.AddVacation,
        payload: response.data,
      };
      vacationStore.dispatch(action);
      return vacation;
    } catch (err: any) {
      notificationService.error(`Couldn't add vacation: ${err.message}`);
    }
  }

  public async followVacation(
    vacationId: number,
    isFollowing: number
  ): Promise<void> {
    const user = userStore.getState().user;
    const vacationInfo = {
      userId: user.userId,
      vacationId: vacationId,
    };
    try {
      if (user.roleId === 1) return;
      isFollowing === 1
        ? axios.delete(appConfig.followVacationUrl, { data: vacationInfo })
        : axios.post(appConfig.followVacationUrl, vacationInfo);
    } catch (err: any) {
      notificationService.error(`You are not allowed to this: ${err.message}`);
    }
  }
}

const vacationService = new VacationService();

export default vacationService;
