import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";
import UserModel from "../Models/UserModel";

class UserService {
  public async getOneUser(userId:number): Promise<UserModel> {    
    const response = await axios.get(appConfig.loginUserUrl+userId);

    const user = response.data;

    return user
  }

  
}

const userService = new UserService();

export default userService;
