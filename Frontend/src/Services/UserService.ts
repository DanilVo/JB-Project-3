import axios from "axios";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";
import { UserAction, UserActionTypes, userStore } from "../Redux/UserState";

class UserService {
  public async updateUser(user: UserModel): Promise<UserModel> {
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
  }
}

const userService = new UserService();

export default userService;
