import { legacy_createStore as createStore } from "redux";
import UserModel from "../Models/UserModel";
import { jwtDecode } from "jwt-decode";

class UserState {
  public user: UserModel = new UserModel();
}

export enum UserActionTypes {
  UpdateUser = "UpdateUser",
}

export interface UserAction {
  type: UserActionTypes;
  payload?: any;
}

function authReducer(
  currentState = new UserState(),
  action: UserAction
): UserState {
  const newState = { ...currentState };

  switch (action.type) {
    case UserActionTypes.UpdateUser:

  }

  return newState;
}

export const authStore = createStore(authReducer);
