import axios from 'axios';
import UserModel from '../Models/UserModel';
import appConfig from '../Utils/AppConfig';
import { UserAction, UserActionTypes, userStore } from '../Redux/UserState';
import notificationService from './NotificationService';

class UserService {
  public async updateUser(user: UserModel): Promise<UserModel> {
    try {
      const { data } = await axios.post(
        appConfig.updateUserUrl + user.userId,
        user
      );
      const action: UserAction = {
        type: UserActionTypes.UpdateUser,
        payload: data,
      };
      userStore.dispatch(action);
      return data;
    } catch (err: any) {
      notificationService.error(`Couldn't update user: ${err.message}`);
    }
  }

  public async getReports(): Promise<void> {
    try {
      const response = await axios.get(appConfig.reportsUrl + 32, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], {
        type: response.headers['content-type'],
      });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'reports.csv';
      link.click();
    } catch (err: any) {
      notificationService.error(`Error downloading file: ${err.message}`);
    }
  }
}

const userService = new UserService();

export default userService;
