import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import Web3 from 'web3'
import { RequestPrice, RequestMax } from '../state/hooks'
import * as config from "../config"

const GlobalStats = () => {

    const State = useSelector(state => state)
    const [cachedPriceVRP, cachePriceVRP ] = useState(0)
    const [cachedPriceVDAO, cachePriceVDAO ] = useState(0)
    const [burnedAmountVRP, setBurnedVRP] = useState(null)
    const [burnedAmountVDAO, setBurnedVDAO] = useState(null)
    const defaultValueText = "Scanning..."
    const data = State.contractData
    const decimal = config.decimal
    const burnedAmount = State.token === config.defaultToken ? burnedAmountVRP : burnedAmountVDAO
    const tokenPrice = State.token === config.defaultToken ? cachedPriceVRP : cachedPriceVDAO

    const soldAmount = parseFloat((((2 * data.saleAmount )- data.totalTokensLeft - data.tokensLeftSecond))/ decimal)
    
    const UpdatePrices = async () => {
      const newPriceVRP = await RequestPrice(config.saleContractAddrVRPUSDT)
      const newPriceVDAO = await RequestPrice(config.saleContractAddrVDAOUSDT)
      cachePriceVRP(newPriceVRP)
      cachePriceVDAO(newPriceVDAO)
    }

    const RequestBurned = async () => { 
      const amountVRP = await RequestMax (config.VRPToken, config.zeroAddress)
      const amountVDAO = await RequestMax (config.VDAOToken, config.zeroAddress)
      setBurnedVRP(amountVRP)
      setBurnedVDAO(amountVDAO)
    }

    const availableTokens = (data.totalTokensLeft !== null) ? 
    (parseFloat(data.totalTokensLeft / decimal) + 
    parseFloat(data.tokensLeftSecond / decimal) - burnedAmount).toLocaleString('ua') :
    defaultValueText

    useEffect(() => {
      UpdatePrices()
      RequestBurned()
    }, [])

    return(
      <div className="stage--stats">
        <p><b>price:</b>{tokenPrice ? ` ${tokenPrice}$` : defaultValueText}</p>
        <p><b>available:</b>{` ${availableTokens}`}</p>
        <p><b>sold:</b>{` ${!data.isDataRequested ? defaultValueText : soldAmount.toLocaleString('ua')}`}</p>
        <p style={{
          paddingBottom: 8
        }}><b>burned:</b>{burnedAmount !== null ? ` ${parseFloat(burnedAmount).toLocaleString('ua')}` : defaultValueText}</p>
        <p><b>Max supply:</b>{` ${parseFloat(config.handContractData.maxSupply).toLocaleString('ua')}`}</p>
        <p><b>For sale total:</b>{` ${parseFloat(config.handContractData.available).toLocaleString('ua')}`}</p>
        <p><b>This round:</b>{` ${parseFloat(config.handContractData.available).toLocaleString('ua')}`}</p>
        <p><b>Total sold:</b>{` ${!data.isDataRequested ? defaultValueText : soldAmount.toLocaleString('ua')}`}</p>
        <p><b>Total burned:</b>{burnedAmount !== null ? ` ${parseFloat(burnedAmount).toLocaleString('ua')}` : defaultValueText}</p>
    </div>
    )
}

export default GlobalStats