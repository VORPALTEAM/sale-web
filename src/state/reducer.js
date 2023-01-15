import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { createReducer, createAction, combineReducers } from '@reduxjs/toolkit';
import Web3 from 'web3'
import * as config from '../config'

// Default values
const clientAccount = null // 0x000000000000000000000
const openedModal = 'none' // none || selecttoken || nowallet
const isWalletConnected = false
const buyingStage = "approve"
const defaultAmount = 100
const investAmountUSDVRP  = 0 // user's buying amount in USDT
const investAmountUSDVDAO  = 0 
const approvedAmountDefault = 0
const contractGlobalData = config.contractDefaultGlobalData

export const actionNames = {
    switchToken : "SWITCH_TOKEN",
    switchCurrency: "SWITCH_CURRENCY",
    openModal: "OPEN_MODAL",
    loadAccount: "LOAD_ACCOUNT",
    updateEnv: "UPDATE_WEB3",
    updateUSDVRP: "UPDATE_USDVRP",
    updateUSDVDAO: "UPDATE_USDVDAO",
    orderUSDVRP: "ORDER_USDVRP",
    orderUSDVDAO: "ORDER_USDVDAO",
    connectedState: "CONNECTED_STATE_CHANGE",
    updateContractData: "UPDATE_CONTRACT_DATA",
    updateApprovedUSDT: "UPDATE_APPROVED_USDT",
    updateApprovedBUSD: "UPDATE_APPROVED_BUSD",
    amountVRPLocked: "AMOUNT_VRP_LOCKED",
    amountVDAOLocked: "AMOUNT_VDAO_LOCKED",
    amountVRPunLocked: "AMOUNT_VRP_UNLOCKED",
    amountVDAOunLocked: "AMOUNT_VDAO_UNLOCKED",
    selectStage: "SELECT_STAGE",
    openInvest: "OPEN_INVEST",
    amountLeftVRP: "AMOUNT_LEFT_VRP",
    amountLeftVDAO: "AMOUNT_LEFT_VDAO"
}

export const switchToken = createAction(actionNames.switchToken)
export const switchCurrency = createAction(actionNames.switchCurrency)
export const selectWindow = createAction(actionNames.openModal)
export const loadAccount = createAction(actionNames.loadAccount)
export const updateUSDVRP = createAction(actionNames.updateUSDVRP)
export const updateUSDVDAO = createAction(actionNames.updateUSDVDAO)
export const seitchToConnected = createAction(actionNames.connectedState)
export const updateEnv = createAction(actionNames.updateEnv)
export const updateContractData = createAction(actionNames.updateContractData)
export const updateApprovedUSDT = createAction(actionNames.updateApprovedUSDT)
export const updateApprovedBUSD = createAction(actionNames.updateApprovedBUSD)
export const updateOrderUSDVRP = createAction(actionNames.orderUSDVRP)
export const updateOrderUSDVDAO = createAction(actionNames.orderUSDVDAO)
export const updateLockedVRP = createAction(actionNames.amountVRPLocked)
export const updateLockedVDAO = createAction(actionNames.amountVDAOLocked)
export const updateUnLockedVRP = createAction(actionNames.amountVRPunLocked)
export const updateUnLockedVDAO = createAction(actionNames.amountVDAOunLocked)
export const selectStage = createAction(actionNames.selectStage)
export const openInvest = createAction(actionNames.openInvest)
export const updateLeftVRP = createAction(actionNames.amountLeftVRP)
export const updateLeftVDAO = createAction(actionNames.amountLeftVDAO)

const SwitchToken = (state = config.defaultToken, action) => {

      switch (action.type) {
        case actionNames.switchToken : 
          try {
            document.cookie = `${config.tokenCookieName}=${action.payload}`
          } catch (e) {
            console.log(e.message)
          }
          return action.payload ? action.payload : state
        default :
          return state
      }
 }  

 const SwitchCurrency = (state = config.defaultCurrency, action) => {

  switch (action.type) {
    case actionNames.switchCurrency : 
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

const AmountUSDVRP = (state = defaultAmount, action) => {

  switch(action.type) {
    case actionNames.updateUSDVRP : 
      return (action.payload !== "undefined") ? action.payload : state
    default :
      return state
  }
} 

const AmountUSDVDAO = (state = defaultAmount, action) => {

  switch(action.type) {
    case actionNames.updateUSDVDAO : 
      return (action.payload !== "undefined") ? action.payload : state
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

const ContractDataState = (state = contractGlobalData, action) => {

  switch(action.type) {
    case actionNames.updateContractData : 
      return action.payload ? action.payload : state
    default :
      return state
  }
}

const UpdateApprovedUSDT = (state = approvedAmountDefault, action) => {

  switch(action.type) {
    case actionNames.updateApprovedUSDT : 
      return (action.payload || action.payload === 0) ? action.payload : state
    default :
      return state
  }
}

const UpdateApprovedBUSD = (state = approvedAmountDefault, action) => {

  switch(action.type) {
    case actionNames.updateApprovedBUSD : 
      return (action.payload || action.payload === 0) ? action.payload : state
    default :
      return state
  }
}


const OrderUSDVRP = (state = config.defaultInvestments, action) => {

  switch(action.type) {
    case actionNames.orderUSDVRP : 
      return (action.payload !== "undefined") ? action.payload : state
    default :
      return state
  }
}

const OrderUSDVDAO = (state = config.defaultInvestments, action) => {

  switch(action.type) {
    case actionNames.orderUSDVDAO : 
      return (action.payload !== "undefined") ? action.payload : state
    default :
      return state
  }
}


const UpdateLockedVRP = (state = investAmountUSDVRP, action) => {

  switch(action.type) {
    case actionNames.amountVRPLocked : 
      return (action.payload || action.payload === 0) ? action.payload : state
    default :
      return state
  }
}

const UpdateLockedVDAO = (state = investAmountUSDVDAO, action) => {

  switch(action.type) {
    case actionNames.amountVDAOLocked : 
      return (action.payload || action.payload === 0) ? action.payload : state
    default :
      return state
  }
}

const UpdateUnLockedVRP = (state = investAmountUSDVRP, action) => {

  switch(action.type) {
    case actionNames.amountVRPunLocked : 
      return (action.payload || action.payload === 0) ? action.payload : state
    default :
      return state
  }
}

const UpdateLeftVRP = (state = null, action) => {

  switch(action.type) {
    case actionNames.amountLeftVRP : 
      return (action.payload || action.payload === 0) ? action.payload : state
    default :
      return state
  }
}

const UpdateLeftVDAO = (state = null, action) => {

  switch(action.type) {
    case actionNames.amountLeftVDAO : 
      return (action.payload || action.payload === 0) ? action.payload : state
    default :
      return state
  }
}

const UpdateUnLockedVDAO = (state = investAmountUSDVDAO, action) => {

  switch(action.type) {
    case actionNames.amountVDAOunLocked : 
      return (action.payload || action.payload === 0) ? action.payload : state
    default :
      return state
  }
}

const SelectStage = (state = buyingStage, action) => {

  switch(action.type) {
    case actionNames.selectStage : 
      return action.payload ? action.payload : state
    default :
      return state
  }
}

const IsInvestOpened = (state = false, action) => {

  switch(action.type) {
    case actionNames.openInvest : 
      return action.payload !== null ? action.payload : state
    default :
      return state
  }
}




export const RootReducer = combineReducers ({
    token: SwitchToken,
    currency: SwitchCurrency,
    modal: openModal,
    account: UserAccount,
    connected: ConnectedState,
    amountUSDVRP: AmountUSDVRP,
    amountUSDVDAO: AmountUSDVDAO,
    orderUSDVRP: OrderUSDVRP,
    orderUSDVDAO: OrderUSDVDAO,
    contractData: ContractDataState,
    approvedUSDT: UpdateApprovedUSDT,
    approvedBUSD: UpdateApprovedBUSD,
    lockedVRP: UpdateLockedVRP,
    lockedVDAO: UpdateLockedVDAO,
    unLockedVRP: UpdateUnLockedVRP,
    unLockedVDAO: UpdateUnLockedVDAO,
    stage: SelectStage,
    isOpened: IsInvestOpened,
    leftVRP: UpdateLeftVRP,
    leftVDAO: UpdateLeftVDAO
})