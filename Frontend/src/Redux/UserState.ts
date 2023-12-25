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
      newState.user = action.payload
      break;
    case UserActionTypes.SetUser:
      const user = action.payload.user
      newState.user = user;
      break;
  }

  return newState;
}

export const userStore = createStore(authReducer);
