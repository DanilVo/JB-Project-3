import { legacy_createStore as createStore } from "redux";
import UserModel from "../Models/UserModel";

class UserState {
  public user: UserModel = new UserModel();
}

export enum UserActionTypes {
  UpdateUser = "UpdateUser",
  SetUser = "SetUser",
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
      break;
    case UserActionTypes.SetUser:
      newState.user = action.payload;
      break;
  }

  return newState;
}

export const userStore = createStore(authReducer);
