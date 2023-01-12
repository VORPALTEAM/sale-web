import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3';
import { selectWindow, loadAccount } from '../../state/reducer'
import { connectOptions, chainID, chainHexID, rpcUrl } from '../../config'
import { RequestWallet, CheckIsConnected } from '../../state/hooks'

const ConnectWalletBtn = () => {

    const dispatch = useDispatch()
    const State = useSelector(state => state)

    const ConnectWallet  = async () => {
      
      try {
        const wallet = await RequestWallet()
        if (!wallet) {
          /* if (!window.ethereum) {
            dispatch(selectWindow("nowallet"))
          } */
         // dispatch(selectWindow("nowallet"))
        } else {
          document.cookie = "saleWalletConnected=true"
        }
        dispatch(loadAccount(wallet))
      } catch (e) {
        dispatch(selectWindow("nowallet"))
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

      dispatch(loadAccount(false))
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