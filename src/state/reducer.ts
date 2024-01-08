import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import * as config from '../config'
import * as types from '../types'

export const actionNames = {
    auth: "AUTH",
    notify: "NOTIFY",
    address: "ADDRESS",
    keys: "KEYS",
    modal: "MODAL",
}

export const AddAccount = createAction<string>(actionNames.auth);

const Auth = (state = "", action: types.stringAction) => {
    switch(action.type) {
      case actionNames.auth : 
        return action.payload
      default :
        return state
    }
  }

export const RootReducer = combineReducers ({
    account: Auth,
})

export type RootState = ReturnType<typeof RootReducer>