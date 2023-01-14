import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actionNames, switchToken, updateContractData } from '../state/reducer'
import * as config from '../config'
import { ContractDataSetup } from '../state/hooks'

const TokenSelector = () => {

    const dispatch = useDispatch()
    const State = useSelector(state => state)
    const checkingCookieName = `${config.tokenCookieName}=${config.selectableToken}`
    
    const checkBox = (event) => {

      const actualToken = State.token === config.defaultToken ? config.selectableToken : config.defaultToken
      dispatch(switchToken(actualToken))

      const requestingContracts = (actualToken === config.defaultToken) ? [
        config.saleContractAddrVRPUSDT,
        config.saleContractAddrVRPBUSD
      ] : [
        config.saleContractAddrVDAOUSDT,
        config.saleContractAddrVDAOBUSD
      ]
      updateContract(requestingContracts)
      return !event.target.checked
    }

    const updateContract = async (requestingContracts) => {
      const contractCommonData = await ContractDataSetup(requestingContracts)
      dispatch(updateContractData(contractCommonData))
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