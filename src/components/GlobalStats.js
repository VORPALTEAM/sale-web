import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import * as config from "../config"

const GlobalStats = () => {

    const State = useSelector(state => state)
    const data = State.contractData
    const decimal = config.decimal

    const soldAmount = parseFloat((((2 * data.saleAmount )- data.totalTokensLeft - data.tokensLeftSecond))/ decimal)

    // console.log(data.saleAmount)
    // console.log(data.totalTokensLeft)

    // console.log(data.saleAmount - data.totalTokensLeft)

    return(
      <div className="stage--stats">
        <p><b>price:</b>{` ${data.price === 0 ? "Updating..." : parseFloat(data.price / decimal)}$`}</p>
        <p><b>available:</b>{` ${parseFloat(config.handContractData.available).toLocaleString('ua')}`}</p>
        <p><b>sold:</b>{` ${soldAmount === 0 ? "Updating..." : soldAmount.toLocaleString('ua')}`}</p>
        <p style={{
          paddingBottom: 8
        }}><b>burned:</b>{` ${parseFloat(config.handContractData.burned).toLocaleString('ua')}`}</p>
        <p><b>Max supply:</b>{` ${parseFloat(config.handContractData.maxSupply).toLocaleString('ua')}`}</p>
        <p><b>For current round:</b>{` ${parseFloat(config.handContractData.available).toLocaleString('ua')}`}</p>
        <p><b>For sale total:</b>{` ${parseFloat(config.handContractData.available).toLocaleString('ua')}`}</p>
        <p><b>Total sold:</b>{` ${soldAmount === 0 ? "Updating..." : soldAmount.toLocaleString('ua')}`}</p>
        <p><b>Total burned:</b>{` ${parseFloat(config.handContractData.burned).toLocaleString('ua')}`}</p>
    </div>
    )
}

export default GlobalStats