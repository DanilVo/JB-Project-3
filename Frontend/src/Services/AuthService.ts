import axios from 'axios';
import CredentialsModel from '../Models/CredentialsModel';
import PasswordRecoveryModel from '../Models/PasswordRecoveryModel';
import UserModel from '../Models/UserModel';
import { AuthAction, AuthActionTypes, authStore } from '../Redux/AuthState';
import appConfig from '../Utils/AppConfig';

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

  public async sendVerificationEmail(email: string): Promise<void> {
    await axios.get(appConfig.sendVerificationEmailUrl + email);
    localStorage.setItem('verifyUser', btoa(email));
  }

  public async verifyCode(code: number): Promise<void> {
    await axios.get(appConfig.verifyCodeUrl + code);
  }

  public async setNewPassword(
    passwordCredentials: PasswordRecoveryModel
  ): Promise<void> {
    await axios.post(appConfig.setNewPasswordUrl, passwordCredentials);
    localStorage.removeItem('verifyUser');
  }
}

const authService = new AuthService();

export default authService;
