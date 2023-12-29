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

    case VacationActionTypes.UpdateVacation:
      const vacationToUpdate = newState.vacations.findIndex(
        (v) => v.description === action.payload.description
      );
      newState.vacations[vacationToUpdate] = action.payload;
      break;

    case VacationActionTypes.DeleteVacation:
      const vacationToDelete = newState.vacations.findIndex(
        (v) => v.vacationUuid === action.payload.vacationUuid
      );
      newState.vacations.splice(vacationToDelete, 1);
  }

  return newState;
}

export const vacationStore = createStore(vacationsReducer);
