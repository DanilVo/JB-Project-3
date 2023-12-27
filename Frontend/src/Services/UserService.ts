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
}

const userService = new UserService();

export default userService;
