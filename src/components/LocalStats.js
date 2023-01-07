import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import { RequestLockedFunds, RequestUnLockedFunds, ContractDataSetup } from '../state/hooks'
import { updateLockedVRP, updateLockedVDAO, 
  updateUnLockedVRP, updateUnLockedVDAO, updateContractData } from '../state/reducer'
import * as config from "../config"

const LocalStats = () => {

    const web3 = new Web3(config.rpcUrl, config.connectOptions)
    const State = useSelector(state => state)
    const dispatch = useDispatch()

    const isDefault = State.token === config.defaultToken
    const lockedAmount = isDefault ? State.lockedVRP : State.lockedVDAO
    const unLockedAmount = isDefault ? State.unLockedVRP : State.unLockedVDAO
    
    const tokenPrice = State.contractData.price / config.decimal
    const activeBalance = isDefault ? 
    State.amountUSDVRP : State.amountUSDVDAO
    const tokenAmountNumber = tokenPrice !== 0 ? parseFloat(activeBalance / tokenPrice) : 0
    const tokenAmount = tokenAmountNumber.toLocaleString('ua')

    const partOfAvailable = ((parseFloat(tokenAmountNumber) / parseFloat(config.handContractData.available)) * 100).toLocaleString('ua')

    const partOfTotal = ((parseFloat(tokenAmountNumber) / parseFloat(config.handContractData.maxSupply)) * 100).toLocaleString('ua')

    const saleDate = new Date(config.handContractData.saleStart * 1000).toLocaleString('ua')

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
              <div className="stage--heading">
                Balance
              </div>
            </div>
            <div className="buy--column--cell row--2">
              {lockedAmount > 0 ? <><div className="value--subtitle red">
                 {`locked till ${saleDate.split(",")[0]}`}
              </div>
              <div className="value--text">
              {lockedAmount > 0 ? `${lockedAmount} ${State.token}` : ""}
              </div></> : null}
            </div>
            <div className="buy--column--cell row--2 no--border">
              {unLockedAmount > 0 ? <><div className="value--subtitle green">
                 unlocked
              </div>
              <div className="value--text">
              {`${unLockedAmount} ${State.token}`}
              </div></> : null}
            </div>
      </>
    )
}

export default LocalStats