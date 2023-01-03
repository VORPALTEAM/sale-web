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
    const tokenAmount = parseFloat(activeBalance / tokenPrice).toLocaleString('ua')

    const partOfAvailable = (parseFloat((activeBalance * config.decimal) / 
    State.contractData.saleAmount) * 100).toLocaleString('ua')

    const partOfTotal = (parseFloat((activeBalance * config.decimal) / 
    config.handContractData.maxSupply) * 100).toLocaleString('ua')

    const saleDate = new Date(config.handContractData.saleStart * 1000).toLocaleString('ua')
    

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
                 40 000 000 VRP
              </div>
            </div>
            <div className="buy--column--cell row--2 no--border">
              <div className="value--subtitle green">
                 unlocked
              </div>
              <div className="value--text">
                 40 000 000 VRP
              </div>
            </div>
      </>
    )
}

export default LocalStats