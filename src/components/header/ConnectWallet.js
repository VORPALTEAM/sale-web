import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { loadAccount } from '../../state/reducer'
import * as config from '../../config'
import { updateLockedVRP, updateLockedVDAO,
  updateUnLockedVRP, updateUnLockedVDAO } from '../../state/reducer'
import { RequestWallet, CheckIsConnected, RequestLockedFunds, RequestUnLockedFunds } from '../../state/hooks'

const ConnectWalletBtn = () => {

    const dispatch = useDispatch()
    const State = useSelector(state => state)
    const isDefault = State.token === config.defaultToken

    const requestingContracts = isDefault ? [
      config.saleContractAddrVRPUSDT,
      config.saleContractAddrVRPBUSD
    ] : [
      config.saleContractAddrVDAOUSDT,
      config.saleContractAddrVDAOBUSD
    ]

    const SetupLockedCustom = async ( wallet ) => {

        const locked = await RequestLockedFunds(requestingContracts, wallet)
        const unLocked = await RequestUnLockedFunds(requestingContracts, wallet)

        if (isDefault) {
          dispatch(updateLockedVRP(locked))
          dispatch(updateUnLockedVRP(unLocked))
        } else {         
          dispatch(updateLockedVDAO(locked))
          dispatch(updateUnLockedVDAO(unLocked))
        }

      return true;
    }

    const ConnectWallet  = async () => {
      
      try {
        const wallet = await RequestWallet()
        if (wallet) {
          document.cookie = "saleWalletConnected=true"
          SetupLockedCustom (wallet)
        }
        dispatch(loadAccount(wallet))
      } catch (e) {
        // dispatch(selectWindow("nowallet"))
        dispatch(loadAccount(null))
      }

      return true
    }

    useEffect(() => {
      if (CheckIsConnected () ||
         document.cookie.indexOf("saleWalletConnected=true") >= 0) {
        ConnectWallet()
      }
    }, [])

    const DisconnectUser = () => {

      dispatch(loadAccount(null))
      document.cookie = "saleWalletConnected=true;  Max-Age=0;";
    }
    
    const VisibleName = ( account ) => {
      if (!account) return "";
      const beginning = account.substring(0, 5)
      const ending = account.substring(account.length - 4)
      return `${beginning}...${ending}`
    }

    return(
          <>
            {!State.account ? <div className="btn connectWallet--btn" onClick={ConnectWallet}>
              Connect wallet
            </div> : 
             <div className="btn wallet--connected">
               {VisibleName(State.account)}
               <div className="user--menu">
                <p onClick={DisconnectUser}>Disconnect</p>
              </div>
              </div>
              }
          </>
    )
}

export default ConnectWalletBtn 