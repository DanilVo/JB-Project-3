import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CredentialsModel from "../Models/CredentialsModel";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";
import UserModel from "../Models/UserModel";
import { UserActionTypes } from "../Redux/UserState";

class AuthService {
  public async logIn(credentials: CredentialsModel): Promise<void> {
    console.log(credentials);

    const response = await axios.post(appConfig.loginUserUrl, credentials);

    const token = response.data;

    const authAction: AuthAction = {
      type: AuthActionTypes.Login,
      payload: token,
    };
    authStore.dispatch(authAction);

    // const userAction: AuthAction = {
    //   type: UserActionTypes.SetUser,
    //   payload: token,
    // };
    // authStore.dispatch(userAction);
  }

  public async register(credentials: UserModel): Promise<void> {
    const response = await axios.post(appConfig.registerUserUrl, credentials);

    const token = response.data;

    const action: AuthAction = {
      type: AuthActionTypes.Register,
      payload: token,
    };
    authStore.dispatch(action);
  }

  public logout(): void {
    const action: AuthAction = { type: AuthActionTypes.Logout };
    authStore.dispatch(action);
  }
}

const authService = new AuthService();

export default authService;
