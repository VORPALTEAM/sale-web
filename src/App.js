import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import './App.css';
import * as config from './config' 
import { updateContractData } from './state/reducer'
import Header from './components/header'
import TokenSelector from './components/TokenSelector'
import StarDiagram from './components/StarDiagram'
import StarTimer from './components/StarTimer'
import AmountInput from './components/AmountInput'
import GlobalStats from './components/GlobalStats'
import LocalStats from './components/LocalStats'
import BuyButton from './components/BuyButton'
import ModalContainer from './components/modals'

function App() {

  const web3 = new Web3(config.rpcUrl, config.connectOptions)
  const State = useSelector(state => state)
  const dispatch = useDispatch()
  

  const ContractDataSetup = async () => {
    const tokenContract = new web3.eth.Contract(config.saleABI, State.token === config.defaultToken ? 
      config.saleContractAddrVRPUSDT : config.saleContractAddrVDAOUSDT)
    
    const tokenSecondContract = new web3.eth.Contract(config.saleABI, State.token === config.defaultToken ? 
        config.saleContractAddrVRPBUSD : config.saleContractAddrVDAOBUSD)

    const tokenPrice = await tokenContract.methods.price().call()
    const contractOwner = await tokenContract.methods.owner().call()
    const saleAmount = await tokenContract.methods.saleAmount().call()
    const saleEnd = await tokenContract.methods.saleEnd().call()
    const saleLength = await tokenContract.methods.saleLength().call()
    const status = await tokenContract.methods.status().call()
    const totalTokensLeft = await tokenContract.methods.totalTokensLeft().call()
    const usdc = await tokenContract.methods.usdc().call()
    const vestingPeriod = await tokenContract.methods.vestingPeriod().call()
    const lockPeriod = await tokenContract.methods.lockPeriod().call()
    const vorpal = await tokenContract.methods.vorpal().call()

    const tokensLeftSecond = await tokenSecondContract.methods.totalTokensLeft().call()

    dispatch(updateContractData({
      owner: contractOwner,
      price: tokenPrice,
      saleAmount: saleAmount,
      saleEnd: saleEnd,
      saleLength: saleLength,
      status: status,
      totalTokensLeft: totalTokensLeft,
      tokensLeftSecond: tokensLeftSecond,
      lockPeriod: lockPeriod,
      usdc: usdc,
      vestingPeriod: vestingPeriod,
        vorpal: vorpal
    }))
  }

  return (
    <div className="App">
      <Header />
      <div className="presale--body" onLoad={ContractDataSetup}>
        <div className="star--section">
          <TokenSelector />
          <StarDiagram />
          <StarTimer />
        </div>
        <div className="buy--section">
          <div className="value--subsection">
           <div className="buy--column--left">
            <div className="buy--column--heading">
              Investments, $
            </div>
            <AmountInput />
            <div className="stage--heading">
              stage: Seed Round
            </div>
            <GlobalStats />
           </div>
           <div className="buy--column--right">
            <div className="buy--column--heading">
              Result
            </div>
            <LocalStats />
           </div>
          </div>
          <BuyButton />
        </div>
      </div>
      <ModalContainer />
    </div>
  );
}

export default App;
