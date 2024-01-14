import axios from 'axios';
import UserModel from '../Models/UserModel';
import VacationModel from '../Models/VacationModel';
import { authStore } from '../Redux/AuthState';
import {
  VacationAction,
  VacationActionTypes,
  vacationStore,
} from '../Redux/VacationState';
import appConfig from '../Utils/AppConfig';
import notificationService from './NotificationService';
import { RoleModel } from '../Models/RoleModel';

class VacationService {
  private options = {
    headers: { 'Content-Type': 'multipart/form-data' },
  };

  private user: UserModel = authStore.getState().user;

  public async getAllVacations(): Promise<VacationModel[]> {
    let vacations = vacationStore.getState().vacations;

    if (vacations.length === 0) {
      const response = await axios.get(
        appConfig.allVacationsUrl + this.user.userId
      );

      vacations = response.data;

      const action: VacationAction = {
        type: VacationActionTypes.SetVacations,
        payload: vacations,
      };

      vacationStore.dispatch(action);
    }
    return vacations;
  }

  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete(appConfig.deleteVacationUrl + vacationId);
    const action: VacationAction = {
      type: VacationActionTypes.DeleteVacation,
      payload: vacationId,
    };
    vacationStore.dispatch(action);
  }

  public async updateVacation(
    vacation: VacationModel,
    vacationId: number
  ): Promise<void> {
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
  }

  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
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
  }

  public async followVacation(
    vacationId: number,
    isFollowing: number
  ): Promise<void> {
    const vacationInfo = {
      userId: this.user.userId,
      vacationId: vacationId,
    };
    if (this.user.roleId === RoleModel.Admin) return;
    isFollowing === 1
      ? axios.delete(appConfig.followVacationUrl, { data: vacationInfo })
      : axios.post(appConfig.followVacationUrl, vacationInfo);
  }
}

const vacationService = new VacationService();

export default vacationService;
