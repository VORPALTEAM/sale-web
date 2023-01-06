import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import * as config from "../config"

const LocalStats = () => {

    const web3 = new Web3(config.rpcUrl, config.connectOptions)
    const State = useSelector(state => state)
    const tokenPrice = State.contractData.price / config.decimal
    const activeBalance = State.token === config.defaultToken ? 
    State.amountUSDVRP : State.amountUSDVDAO
    const tokenAmountNumber = parseFloat(activeBalance / tokenPrice)
    const tokenAmount = tokenAmountNumber.toLocaleString('ua')

    const partOfAvailable = ((parseFloat(tokenAmountNumber) / parseFloat(config.handContractData.available)) * 100).toLocaleString('ua')

    const partOfTotal = ((parseFloat(tokenAmountNumber) / parseFloat(config.handContractData.maxSupply)) * 100).toLocaleString('ua')

    const saleDate = new Date(config.handContractData.saleStart * 1000).toLocaleString('ua')


    //Personal data

    const [lockedAmount, setLockedAmount ]= useState(0)
    let [unLockedAmount, setUnLockedAmount] = useState(0)
    const clientAccount = State.account

    async function PersonalDataSetup () {
      const firstContract = new web3.eth.Contract(config.saleABI, State.token === config.defaultToken ? 
        config.saleContractAddrVRPUSDT : config.saleContractAddrVDAOUSDT)
      const secondContract = new web3.eth.Contract(config.saleABI, State.token === config.defaultToken ? 
          config.saleContractAddrVRPBUSD : config.saleContractAddrVDAOBUSD)

      const firstContractUnLocked = await firstContract.methods.getUnlockedTokens(clientAccount).call()
      const secondContractUnLocked = await secondContract.methods.getUnlockedTokens(clientAccount).call()
      
      setUnLockedAmount(parseInt(firstContractUnLocked / config.decimal) + parseInt(secondContractUnLocked / config.decimal))
    }
    
    if (clientAccount) {
      PersonalDataSetup ()
    }

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
              <div className="value--subtitle red">
                 {`locked till ${saleDate}`}
              </div>
              <div className="value--text">
              {`${lockedAmount} ${State.token}`}
              </div>
            </div>
            <div className="buy--column--cell row--2 no--border">
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