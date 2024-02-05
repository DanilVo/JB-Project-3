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

    case VacationActionTypes.AddVacation:
      if (Array.isArray(action.payload)) {
        newState.vacations = newState.vacations.concat(action.payload);
      } else {
        newState.vacations.push(action.payload);
      }
      break;

    case VacationActionTypes.UpdateVacation:
      const vacationToUpdate = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload.vacationId
      );
      newState.vacations[vacationToUpdate] = action.payload;
      break;

    case VacationActionTypes.DeleteVacation:
      const vacationToDelete = newState.vacations.findIndex(
        (v) => v.vacationId === action.payload
      );
      newState.vacations.splice(vacationToDelete, 1);
      break;
  }

  return newState;
}

export const vacationStore = createStore(vacationsReducer);
