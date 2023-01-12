import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import { RequestPrice } from '../state/hooks'
import * as config from "../config"

const GlobalStats = () => {

    const State = useSelector(state => state)
    const [cachedPriceVRP, cachePriceVRP ] = useState(0)
    const [cachedPriceVDAO, cachePriceVDAO ] = useState(0)
    const defaultValueText = "Scanning..."
    const data = State.contractData
    const decimal = config.decimal
    const tokenPrice = State.token === config.defaultToken ? cachedPriceVRP : cachedPriceVDAO

    const soldAmount = parseFloat((((2 * data.saleAmount )- data.totalTokensLeft - data.tokensLeftSecond))/ decimal)
    
    const UpdatePrices = async () => {
      const newPriceVRP = await RequestPrice(config.saleContractAddrVRPUSDT)
      const newPriceVDAO = await RequestPrice(config.saleContractAddrVDAOUSDT)
      cachePriceVRP(newPriceVRP)
      cachePriceVDAO(newPriceVDAO)
    }

    const availableTokens = parseFloat(data.totalTokensLeft / decimal) + parseFloat(data.tokensLeftSecond / decimal)

    useEffect(() => {
      UpdatePrices()
    }, [])

    return(
      <div className="stage--stats">
        <p><b>price:</b>{tokenPrice ? ` ${tokenPrice}$` : defaultValueText}</p>
        <p><b>available:</b>{` ${availableTokens.toLocaleString('ua')}`}</p>
        <p><b>sold:</b>{` ${!data.isDataRequested ? defaultValueText : soldAmount.toLocaleString('ua')}`}</p>
        <p style={{
          paddingBottom: 8
        }}><b>burned:</b>{` ${parseFloat(config.handContractData.burned).toLocaleString('ua')}`}</p>
        <p><b>Max supply:</b>{` ${parseFloat(config.handContractData.maxSupply).toLocaleString('ua')}`}</p>
        <p><b>For current round:</b>{` ${parseFloat(config.handContractData.available).toLocaleString('ua')}`}</p>
        <p><b>For sale total:</b>{` ${parseFloat(config.handContractData.available).toLocaleString('ua')}`}</p>
        <p><b>Total sold:</b>{` ${!data.isDataRequested ? defaultValueText : soldAmount.toLocaleString('ua')}`}</p>
        <p><b>Total burned:</b>{` ${parseFloat(config.handContractData.burned).toLocaleString('ua')}`}</p>
    </div>
    )
}

export default GlobalStats