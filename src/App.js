import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import './App.css';
import Preloader from "./components/Preloader"
import Header from './components/header'
import TokenSelector from './components/TokenSelector'
import StarDiagram from './components/StarDiagram'
import StarTimer from './components/StarTimer'
import AmountInput from './components/AmountInput'
import GlobalStats from './components/GlobalStats'
import LocalStats from './components/LocalStats'
import BuyButton from './components/BuyButton'
import ModalContainer from './components/modals'
import { handContractData } from './config';

function App() {

  // <Preloader />
  const State = useSelector(state => state)
  const nowD = new Date()
  const now = nowD.getTime()
  const [time, setTime] = useState(now)
  const timeEnd = handContractData.saleEnd * 1000
  const stageText = time > timeEnd ? "stage: waiting... " :"stage: Seed Round"
  
  const StartTimer = () => {
    if (time <= timeEnd) {
      setInterval(() => {
        const nowm = new Date()
        const nowt = nowm.getTime()
        setTime(nowt)
      }, (timeEnd - time + 1000))
    } 
  }
  return (
    <div className="App" onLoad={StartTimer}>
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
              {stageText}
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
