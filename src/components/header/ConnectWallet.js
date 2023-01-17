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

    const requestingContractsVRP = [
      config.saleContractAddrVRPUSDT,
      config.saleContractAddrVRPBUSD
    ] 
    const requestingContractsVAO = [
      config.saleContractAddrVDAOUSDT,
      config.saleContractAddrVDAOBUSD
    ]

    const SetupLockedCustom = async ( wallet ) => {

        const lockedVRP = await RequestLockedFunds(requestingContractsVRP, wallet)
        const unLockedVRP = await RequestUnLockedFunds(requestingContractsVRP, wallet)
        const lockedVAO = await RequestLockedFunds(requestingContractsVAO, wallet)
        const unLockedVAO = await RequestUnLockedFunds(requestingContractsVAO, wallet)


          dispatch(updateLockedVRP(lockedVRP))
          dispatch(updateUnLockedVRP(unLockedVRP))    
          dispatch(updateLockedVDAO(lockedVAO))
          dispatch(updateUnLockedVDAO(unLockedVAO))


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