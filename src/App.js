import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import './App.css';
import * as config from './config' 
import { updateContractData } from './state/reducer'
import { ContractDataSetup } from './state/hooks'
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

  const State = useSelector(state => state)
  const dispatch = useDispatch()
  

  return (
    <div className="App">
      <Header />
      <div className="presale--body">
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
