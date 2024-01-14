import axios from 'axios';
import UserModel from '../Models/UserModel';
import { AuthAction, AuthActionTypes, authStore } from '../Redux/AuthState';
import appConfig from '../Utils/AppConfig';

class UserService {
  public async updateUser(user: UserModel): Promise<UserModel> {
    const { data } = await axios.put(
      appConfig.updateUserUrl + user.userId,
      user
    );
    const action: AuthAction = {
      type: AuthActionTypes.Register,
      payload: data,
    };
    authStore.dispatch(action);
    return data;
  }

  public async getReports(userId: number): Promise<void> {
    const response = await axios.get(appConfig.reportsUrl + userId, {
      responseType: 'blob',
    });
    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'reports.csv';
    link.click();
  }
}

const userService = new UserService();

export default userService;
