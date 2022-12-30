import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import Web3 from 'web3'
import * as config from '../config'

// Default values
const clientAccount = null // 0x000000000000000000000
const openedModal = 'none' // none || connectWallet || noWallet
const isWalletConnected = false
const investAmountUSDVRP  = 0 // user's buying amount in USDT
const investAmountUSDVDAO  = 0 
const contractGlobalData = {
  vrp: {},
  vdao: {}
}
const contractUserData = {
  vrp: {},
  vdao: {}
}

export const actionNames = {
    switchToken : "SWITCH_TOKEN",
    openModal: "OPEN_MODAL",
    loadAccount: "LOAD_ACCOUNT",
    updateEnv: "UPDATE_WEB3",
    updateUSDVRP: "UPDATE_USDVRP",
    updateUSDVDAO: "UPDATE_USDVDAO",
    connectedState: "CONNECTED_STATE_CHANGE"
}

export const switchToken = createAction(actionNames.switchToken)
export const selectWindow = createAction(actionNames.openModal)
export const loadAccount = createAction(actionNames.loadAccount)
export const updateUSDVRP = createAction(actionNames.updateUSDVRP)
export const updateUSDVDAO = createAction(actionNames.updateUSDVDAO)
export const seitchToConnected = createAction(actionNames.connectedState)
export const updateEnv = createAction(actionNames.updateEnv)

const SwitchToken = (state = config.defaultToken, action) => {

      switch (action.type) {
        case actionNames.switchToken : 
          return action.payload ? action.payload : state
        default :
          return state
      }
 }  

const openModal = (state = openedModal, action) => {

    switch(action.type) {
      case actionNames.openModal : 
        return action.payload ? action.payload : state
      default :
        return state
    }
} 

const UserAccount = (state = clientAccount, action) => {

  switch(action.type) {
    case actionNames.loadAccount : 
      return action.payload
    default :
      return state
  }
} 

const AmountUSDVRP = (state = investAmountUSDVRP, action) => {

  switch(action.type) {
    case actionNames.updateUSDVRP : 
      return action.payload ? action.payload : state
    default :
      return state
  }
} 

const AmountUSDVDAO = (state = investAmountUSDVDAO, action) => {

  switch(action.type) {
    case actionNames.updateUSDVDAO : 
      return action.payload ? action.payload : state
    default :
      return state
  }
} 

const ConnectedState = (state = isWalletConnected, action) => {

  switch(action.type) {
    case actionNames.connectedState : 
      return action.payload ? action.payload : state
    default :
      return state
  }
}



export const RootReducer = combineReducers ({
    token: SwitchToken,
    modal: openModal,
    account: UserAccount,
    connected: ConnectedState,
    amountUSDVRP: AmountUSDVRP,
    amountUSDVDAP: AmountUSDVDAO
})