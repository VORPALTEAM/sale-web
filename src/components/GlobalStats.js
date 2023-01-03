import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import * as config from "../config"

const GlobalStats = () => {

    const State = useSelector(state => state)
    const data = State.contractData
    const decimal = config.decimal

    // console.log(data.saleAmount)
    // console.log(data.totalTokensLeft)

    // console.log(data.saleAmount - data.totalTokensLeft)

    return(
      <div className="stage--stats">
        <p><b>price:</b>{` ${parseFloat(data.price / decimal)}$`}</p>
        <p><b>available:</b>{` ${parseFloat(config.handContractData.available / decimal).toLocaleString('ua')}`}</p>
        <p><b>sold:</b>{` ${parseFloat((data.saleAmount - data.totalTokensLeft)/ decimal).toLocaleString('ua')}`}</p>
        <p><b>burned:</b>{` ${parseFloat(config.handContractData.burned/ decimal).toLocaleString('ua')}`}</p>
        <p><b>Max supply:</b>{` ${parseFloat(config.handContractData.maxSupply / decimal).toLocaleString('ua')}`}</p>
        <p><b>For current round:</b>{` ${parseFloat(config.handContractData.available / decimal).toLocaleString('ua')}`}</p>
        <p><b>For sale total:</b>{` ${parseFloat(data.saleAmount / decimal).toLocaleString('ua')}`}</p>
        <p><b>Total sold:</b>{` ${parseFloat((data.saleAmount - data.totalTokensLeft)/ decimal).toLocaleString('ua')}`}</p>
        <p><b>Total burned:</b>{` ${parseFloat(config.handContractData.burned / decimal).toLocaleString('ua')}`}</p>
    </div>
    )
}

export default GlobalStats