import axios from "axios";
import { RoleModel } from "../Models/RoleModel";
import UserModel from "../Models/UserModel";
import VacationModel from "../Models/VacationModel";
import { authStore } from "../Redux/AuthState";
import {
  VacationAction,
  VacationActionTypes,
  vacationStore,
} from "../Redux/VacationState";
import appConfig from "../Utils/AppConfig";
import MultipleVacationsModel from "../Models/MultipleVacationsModel";

class VacationService {
  private singleFileOptions = {
    headers: { "Content-Type": "multipart/form-data" },
  };
  private multipleFileOptions = {
    headers: { "Content-Type": "application/json" },
  };
  // multipart/form-data
  // application/json
  public async getAllVacations(): Promise<VacationModel[]> {
    const user: UserModel = authStore.getState().user;
    const vacations = vacationStore.getState().vacations;
    if (vacations.length === 0) {
      const { data } = await axios.get(appConfig.allVacationsUrl + user.userId);
      const action: VacationAction = {
        type: VacationActionTypes.SetVacations,
        payload: data,
      };
      vacationStore.dispatch(action);
      return data;
    }
    return vacations;
  }

  public async deleteVacation(vacationId: number): Promise<void> {
    await axios.delete(appConfig.vacationActionsUrl + vacationId);
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
    const { data } = await axios.put(
      appConfig.vacationActionsUrl + vacationId,
      vacation,
      this.singleFileOptions
    );

    data.followersCount = vacation.followersCount;
    data.isFollowing = vacation.isFollowing;

    const action: VacationAction = {
      type: VacationActionTypes.UpdateVacation,
      payload: data,
    };

    vacationStore.dispatch(action);
  }

  public async addVacation(vacation: VacationModel): Promise<VacationModel> {
    console.log(vacation);

    const response = await axios.post(
      appConfig.addVacationUrl,
      vacation,
      this.singleFileOptions
    );

    const action: VacationAction = {
      type: VacationActionTypes.AddVacation,
      payload: response.data,
    };
    vacationStore.dispatch(action);
    return vacation;
  }

  public async addMultipleVacations(
    vacations: MultipleVacationsModel[]
  ): Promise<MultipleVacationsModel[]> {
    console.log(vacations);

    const response = await axios.post(
      appConfig.addVacationUrl,
      vacations,
      this.multipleFileOptions
    );

    // const action: VacationAction = {
    //   type: VacationActionTypes.AddVacation,
    //   payload: response.data,
    // };
    // vacationStore.dispatch(action);
    return vacations;
  }

  public async followVacation(
    vacationId: number,
    isFollowing: number
  ): Promise<void> {
    const user: UserModel = authStore.getState().user;

    const vacationInfo = {
      userId: user.userId,
      vacationId: vacationId,
    };
    if (user.roleId === RoleModel.Admin) return;
    isFollowing === 1
      ? axios.delete(appConfig.followActionsVacationUrl, { data: vacationInfo })
      : axios.post(appConfig.followActionsVacationUrl, vacationInfo);
  }
}

const vacationService = new VacationService();

export default vacationService;
