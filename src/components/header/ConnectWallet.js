import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectWindow, loadAccount } from '../../state/reducer'
import { connectOptions, chainID, chainHexID, rpcUrl } from '../../config'
import Web3 from 'web3';

const ConnectWalletBtn = () => {

    const dispatch = useDispatch()
    const State = useSelector(state => state)
    const env = window.ethereum

    const ConnectWallet  = async () => {

      if (!env) {
          dispatch(selectWindow("nowallet"))
          return false;
      }

      const accs = await env.request({ method: "eth_requestAccounts" }, connectOptions)
      const network = env.chainId

      if (network != chainHexID) {
        const changeNetwork = await env.request({
          method: 'wallet_addEthereumChain',
          params: [{ 
            chainId: chainHexID,
            chainName: 'Binance',
            nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18
            },
            rpcUrls: [rpcUrl]
        }]
      })
      }
      dispatch(loadAccount(accs[0]))
    }

    const DisconnectUser = () => {
      console.log("disconnect")
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