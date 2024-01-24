import axios from "axios";
import CredentialsModel from "../Models/CredentialsModel";
import UserModel from "../Models/UserModel";
import { AuthAction, AuthActionTypes, authStore } from "../Redux/AuthState";
import appConfig from "../Utils/AppConfig";

class AuthService {
  public async logIn(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post(appConfig.loginUserUrl, credentials);

    const token = response.data;

    const authAction: AuthAction = {
      type: AuthActionTypes.Login,
      payload: token,
    };
    authStore.dispatch(authAction);
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

  public async passwordRecovery(email: string): Promise<void> {
    const response = await axios.get(appConfig.passwordRecoveryUrl + email);
    console.log(response);
  }
}

const authService = new AuthService();

export default authService;
