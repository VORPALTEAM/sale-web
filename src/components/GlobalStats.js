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
    const isDefault = State.token === config.defaultToken
    const data = State.contractData
    const decimal = config.decimal
    const burnedAmount = isDefault ? burnedAmountVRP : burnedAmountVDAO
    const tokenPrice = isDefault ? cachedPriceVRP : cachedPriceVDAO
    const leftAmount = isDefault ? State.leftVRP : State.leftVDAO
    const soldVRP = State.leftVRP === null ? defaultValueText : config.saleAmountVRP - State.leftVRP
    const soldVDAO = State.leftVDAO === null ? defaultValueText : config.saleAmountVDAO - State.leftVDAO

    const soldAmount = isDefault ? soldVRP : 
    soldVDAO 

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

    const availableTokens = (leftAmount !== null) ? 
    (leftAmount).toLocaleString('ua') :
    defaultValueText

    useEffect(() => {
      UpdatePrices()
      RequestBurned()
    }, [])

    return(
      <div className="stage--stats">
        <p><b>price:</b>{tokenPrice ? ` ${tokenPrice}$` : defaultValueText}</p>
        <p><b>available:</b>{` ${availableTokens}`}</p>
        <p><b>sold:</b>{` ${soldAmount.toLocaleString('ua')}`}</p>
        <p style={{
          paddingBottom: 8
        }}><b>burned:</b>{burnedAmount !== null ? ` ${parseFloat(burnedAmount).toLocaleString('ua')}` : defaultValueText}</p>
        <p><b>Max supply:</b>{` ${(isDefault ? config.totalAmountVRP : config.totalAmountVDAO).toLocaleString('ua')}`}</p>
        <p><b>For sale total:</b>{` ${(isDefault ? config.totalSaleVRP : config.totalSaleVDAO).toLocaleString('ua')}`}</p>
        <p><b>This round:</b>{` ${parseFloat(isDefault ? config.saleAmountVRP : config.saleAmountVDAO).toLocaleString('ua')}`}</p>
        <p><b>Total sold:</b>{` ${soldAmount.toLocaleString('ua')}`}</p>
        <p><b>Total burned:</b>{burnedAmount !== null ? ` ${parseFloat(burnedAmount).toLocaleString('ua')}` : defaultValueText}</p>
    </div>
    )
}

export default GlobalStats