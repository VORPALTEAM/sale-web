import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actionNames, switchToken, updateApproved } from '../state/reducer'
import * as config from '../config'
import { ContractDataSetup, AcknowApprovedAmount } from '../state/hooks'

const TokenSelector = () => {

    const dispatch = useDispatch()
    const State = useSelector(state => state)
    const checkingCookieName = `${config.tokenCookieName}=${config.selectableToken}`

    const isDefault = State.token === config.defaultToken
    const currencyIsDefault = State.currency === config.defaultCurrency

    const CurrentContractCustom = (token) => {

      const localIsDefault = token === config.defaultToken

      switch (true) {
          case (currencyIsDefault && localIsDefault) :
          return config.saleContractAddrVRPUSDT
          case (currencyIsDefault && !localIsDefault) :
          return config.saleContractAddrVDAOUSDT
          case (!currencyIsDefault && localIsDefault) :
          return config.saleContractAddrVRPBUSD
          case (!currencyIsDefault && !localIsDefault) :
          return config.saleContractAddrVDAOBUSD
          default : 
          return null
      }
    }

    function CurrentAllowanceSetupCustom (value, currency, token) {

      const localIsDefault = token === config.defaultToken
      const localCurrencyIsDefault = currency === config.defaultCurrency

      const newAllowance = {
         VRPUSDT: (localCurrencyIsDefault && localIsDefault) ? value : State.approvedValues.VRPUSDT,
         VAOUSDT: (localCurrencyIsDefault && !localIsDefault) ? value : State.approvedValues.VAOUSDT,
         VRPBUSD: (!localCurrencyIsDefault && localIsDefault) ? value : State.approvedValues.VRPBUSD,
         VAOBUSD: (!localCurrencyIsDefault && !localIsDefault) ? value : State.approvedValues.VAOBUSD
      }
      dispatch(updateApproved(newAllowance))
   }
    
    const checkBox = (event) => {

      const actualToken = State.token === config.defaultToken ? config.selectableToken : config.defaultToken

      dispatch(switchToken(actualToken))
      const currencyAddr =  currencyIsDefault ? config.usdTokens[0].address : config.usdTokens[1].address
      AcknowApprovedAmount(currencyAddr, CurrentContractCustom(actualToken), State.account).then((res) => {

        CurrentAllowanceSetupCustom (res, State.currency, actualToken)
      })

      return !event.target.checked
    }

    useEffect(() => {
      try {
        if (document.cookie.indexOf(checkingCookieName) > 0) {
          dispatch(switchToken(config.selectableToken))
        }
      } catch (e) {
        console.log(e.message)
      }
    }, [])
    

    return(
       <div className="token--selector">
        <div className={`token token--vrp ${State.token !== config.defaultToken ? 'inActive' : ''}`}>{config.defaultToken}</div>
        <label className="switch--token">
           <input type="checkbox" onChange={checkBox} 
           checked={State.token === config.defaultToken ? "" : "checked"} />
           <span className="checker round"></span>
        </label>
        <div className={`token token--vdao ${State.token === config.defaultToken ? 'inActive' : ''}`}>{config.selectableToken}</div>
      </div>
    )
}

export default TokenSelector