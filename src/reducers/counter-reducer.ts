import {getFromLocalStorage} from "../localStorage/srorage";
import {Dispatch} from "redux";
import {StateType} from "../reduxStore/store";
import {ThunkAction} from "redux-thunk";

export type InitialStateType = typeof initialState

export type ActionType =
  ChangeStatusACType
  | ChangeMaxValueACType
  | ChangeMinValueACType
  | IncrementCounterValueACType
  | ResetCounterValueACType
  | getValueFromLocalStorageACType


export type StatusType = 'setting' | 'counter' | 'error'

const initialState = {
  counter: 0,
  values: {
    minValue: 0,
    maxValue: 5
  },
  status: 'setting' as StatusType
}

export const counterReducer = (state = initialState, action: ActionType): InitialStateType => {
  switch (action.type) {
    case "CHANGE-STATUS":
      return {...state, status: action.payload.status}
    case "CHANGE-MAX-INPUT-VALUE":
      return {...state, values: {...state.values, maxValue: action.payload.value}}
    case "CHANGE-MIN-INPUT-VALUE":
      return {...state, values: {...state.values, minValue: action.payload.value}}
    case "INCREMENT-COUNTER-VALUE":
      return {...state, counter: state.counter + 1}
    case "RESET-COUNTER-VALUE":
      return {...state, counter: state.values.minValue}
    case "GET-VALUE-FROM-LOCAL-STORAGE":
      return {...state, values: action.payload.values}
    default:
      return state
  }
}

type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (status: StatusType) => {
  return {
    type: 'CHANGE-STATUS',
    payload: {
      status
    }
  } as const
}

type ChangeMinValueACType = ReturnType<typeof changeMinValueAC>
export const changeMinValueAC = (value: number) => {
  return {
    type: 'CHANGE-MIN-INPUT-VALUE',
    payload: {
      value
    }
  } as const
}

type ChangeMaxValueACType = ReturnType<typeof changeMaxValueAC>
export const changeMaxValueAC = (value: number) => {
  return {
    type: 'CHANGE-MAX-INPUT-VALUE',
    payload: {
      value
    }
  } as const
}

type IncrementCounterValueACType = ReturnType<typeof incrementCounterValueAC>
export const incrementCounterValueAC = () => {
  return {
    type: 'INCREMENT-COUNTER-VALUE',
  } as const
}

type ResetCounterValueACType = ReturnType<typeof resetCounterValueAC>
export const resetCounterValueAC = () => {
  return {
    type: 'RESET-COUNTER-VALUE',
  } as const
}

type getValueFromLocalStorageACType = ReturnType<typeof getValueFromLocalStorageAC>
export const getValueFromLocalStorageAC = (values: { minValue: number, maxValue: number }) => {
  return {
    type: 'GET-VALUE-FROM-LOCAL-STORAGE',
    payload: {
      values
    }
  } as const
}

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, StateType, unknown, ActionType>
export const getValueFromLocalStorageTC = (): ThunkType => (dispatch: Dispatch) => {
  const values = getFromLocalStorage()
  if (values) {
    dispatch(getValueFromLocalStorageAC(values))
  }
}
