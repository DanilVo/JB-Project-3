import axios from 'axios';
import appConfig from '../Utils/AppConfig';
import CredentialsModel from '../Models/CredentialsModel';
import { AuthAction, AuthActionTypes, authStore } from '../Redux/AuthState';
import UserModel from '../Models/UserModel';

class AuthService {
  public async logIn(credentials: CredentialsModel): Promise<void> {
    const response = await axios.post(appConfig.loginUrl, credentials);

    const token = response.data;

    const action: AuthAction = { type: AuthActionTypes.Login, payload: token };
    authStore.dispatch(action);
  }

  public async register(credentials: UserModel): Promise<void> {
    console.log(credentials);

    const response = await axios.post(appConfig.registerUrl, credentials);

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
