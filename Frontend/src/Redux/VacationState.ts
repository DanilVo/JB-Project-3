import { legacy_createStore as createStore } from 'redux';
import VacationModel from '../Models/VacationModel';

export class VacationState {
  vacations: VacationModel[] = [];
}

export enum VacationActionTypes {
  SetVacations = 'SetVacations',
  AddVacation = 'AddVacation',
  UpdateVacation = 'UpdateVacation',
  DeleteVacation = 'DeleteVacation',
}

export interface VacationAction {
  type: VacationActionTypes;
  payload?: any;
}

function vacationsReducer(
  currentState = new VacationState(),
  action: VacationAction
): VacationState {
  const newState = { ...currentState };

  switch (action.type) {
    case VacationActionTypes.SetVacations:
      newState.vacations = action.payload;
      break;
  }

  return newState;
}

export const vacationStore = createStore(vacationsReducer);
