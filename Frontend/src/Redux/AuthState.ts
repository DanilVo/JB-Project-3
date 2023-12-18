import { legacy_createStore as createStore } from 'redux';
import UserModel from '../Models/UserModel';
import { jwtDecode } from 'jwt-decode';

class AuthState {
  public user: UserModel = null;
  public token: string = null;

  constructor() {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.user = jwtDecode<{ user: UserModel }>(this.token).user;
    }
  }
}

export enum AuthActionTypes {
  Register = 'Register',
  Login = 'Login',
  Logout = 'Logout',
}

export interface AuthAction {
  type: AuthActionTypes;
  payload?: any;
}

function authReducer(
  currentState = new AuthState(),
  action: AuthAction
): AuthState {
  const newState = { ...currentState };

  switch (action.type) {
    case AuthActionTypes.Login:
    case AuthActionTypes.Register:
      newState.user = jwtDecode<{ user: UserModel }>(action.payload).user;
      newState.token = action.payload;
      localStorage.setItem('token', newState.token);
      break;
    case AuthActionTypes.Logout:
      newState.token = null;
      newState.user = null;
      localStorage.removeItem('token');
  }

  return newState;
}

export const authStore = createStore(authReducer);
