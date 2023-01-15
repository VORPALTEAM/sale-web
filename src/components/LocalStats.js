import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RequestLockedFunds, RequestUnLockedFunds, ContractDataSetup, RequestLeftTokens } from '../state/hooks'
import { updateLockedVRP, updateLockedVDAO, updateLeftVRP, updateLeftVDAO,
  updateUnLockedVRP, updateUnLockedVDAO, updateContractData } from '../state/reducer'
import * as config from "../config"

const LocalStats = () => {

    const State = useSelector(state => state)
    const dispatch = useDispatch()

    const isDefault = State.token === config.defaultToken
    const lockedAmount = isDefault ? State.lockedVRP : State.lockedVDAO
    const unLockedAmount = isDefault ? State.unLockedVRP : State.unLockedVDAO
    
    const tokenPrice = isDefault ? config.priceVRP : config.priceVDAO
    const activeBalance = isDefault ? 
    State.amountUSDVRP : State.amountUSDVDAO
    const tokenAmountNumber = tokenPrice !== 0 ? parseFloat(activeBalance / tokenPrice) : 0
    const tokenAmount = tokenAmountNumber.toLocaleString('ua')

    const partOfAvailable = ((parseFloat(tokenAmountNumber) / parseFloat(config.handContractData.available)) * 100).toLocaleString('ua')

    const partOfTotal = ((parseFloat(tokenAmountNumber) / parseFloat(config.handContractData.maxSupply)) * 100).toLocaleString('ua')

    const saleDate = new Date(config.unLockDate * 1000).toLocaleString('ua')

    const requestingContracts = isDefault ? [
      config.saleContractAddrVRPUSDT,
      config.saleContractAddrVRPBUSD
    ] : [
      config.saleContractAddrVDAOUSDT,
      config.saleContractAddrVDAOBUSD
    ]

    const [VRPDataRequested, checkVRPRequest] = useState(false)
    const [VDAOataRequested, checkVDAORequest] = useState(false)
    const [commonDataRequested, checkCommonRequest] = useState(false)

    //Personal data
    const SetupLocked = async () => {

      if (!commonDataRequested) {
        const contractCommonData = await ContractDataSetup(requestingContracts)
        dispatch(updateContractData(contractCommonData))
        checkCommonRequest(true)
      }

      const leftVRPUSDT = await RequestLeftTokens(config.saleContractAddrVRPUSDT) / config.decimal
      const leftVRPBUSD = await RequestLeftTokens(config.saleContractAddrVRPBUSD) / config.decimal

      const leftVDAOUSDT = await RequestLeftTokens(config.saleContractAddrVDAOUSDT) / config.decimal
      const leftVDAOBUSD = await RequestLeftTokens(config.saleContractAddrVDAOBUSD) / config.decimal
      
      dispatch(updateLeftVRP(Math.round(leftVRPUSDT) + Math.round(leftVRPBUSD)))
      dispatch(updateLeftVDAO(Math.round(leftVDAOUSDT) + Math.round(leftVDAOBUSD)))

      if ((VRPDataRequested === true && isDefault) || (VDAOataRequested && !isDefault)) return false;

      if (State.account) {
        const locked = await RequestLockedFunds(requestingContracts, State.account)
        const unLocked = await RequestUnLockedFunds(requestingContracts, State.account)

        if (isDefault) {
          dispatch(updateLockedVRP(locked))
          dispatch(updateUnLockedVRP(unLocked))
          checkVRPRequest(true)
        } else {         
          dispatch(updateLockedVDAO(locked))
          dispatch(updateUnLockedVDAO(unLocked))
          checkVDAORequest(true)
        }
      } 
      return true;
    }

    setInterval(() => {
      SetupLocked()
    }, config.refreshPeriod)

    SetupLocked()

    return(
      <>
        <div className="buy--column--cell row--1">
              <div className="value--text">
                {`${tokenAmount} ${State.token}`}
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle">
                Title
              </div>
              <div className="value--text">
              {`${partOfAvailable} %`}
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle">
                Title
              </div>
              <div className="value--text">
              {`${partOfTotal} %`}
              </div>
            </div>
            <div className="buy--column--cell">
              <div className="stage--heading row--1" style={{
                paddingTop: 5,
                borderBottom: 'none',
                height: 36
              }}>
                Balance
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle red">
                 {lockedAmount > 0 ? `locked till ${saleDate.split(",")[0]}` : `locked`}
              </div>
              <div className="value--text">
              {`${(lockedAmount - unLockedAmount) < 0 ? 0 : (lockedAmount - unLockedAmount)} ${State.token}`}
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle green">
                 unlocked
              </div>
              <div className="value--text">
              {`${unLockedAmount} ${State.token}`}
              </div>
            </div>
      </>
    )
}

export default LocalStats