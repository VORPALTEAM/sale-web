import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { switchToken, switchCurrency, selectWindow, updateApproved } from '../../state/reducer'
import { AcknowApprovedAmount, ContractDataSetup } from '../../state/hooks';
import * as config from '../../config'

const SelectToken = ({ pair }) => {
   
    const State = useSelector(state => state)
    const dispatch = useDispatch()
    const isDefault = State.token === config.defaultToken
    const currencyIsDefault = State.currency === config.defaultCurrency

    const isCurrency = pair === "currency" ? true : false

    const windows = config.windowNames

    let currentContract = null


    function CurrentAllowanceSetupCustom (value, currency, token) {

        const localIsDefault = token === config.defaultToken
        const localCurrencyIsDefault = currency === config.defaultCurrency

        const newAllowance = {
           VRPUSDT: (localCurrencyIsDefault && localIsDefault) ? value : State.approvedValues.VRPUSDT,
           VAOUSDT: (localCurrencyIsDefault && !localIsDefault) ? value : State.approvedValues.VAOUSDT,
           VRPBUSD: (!localCurrencyIsDefault && localIsDefault) ? value : State.approvedValues.VRPBUSD,
           VAOBUSD: (!localCurrencyIsDefault && !localIsDefault) ? value : State.approvedValues.VAOBUSD
        }
        dispatch(updateApproved(newAllowance))
     }


    /* const updateContract = async (requestingContracts) => {
        const contractCommonData = await ContractDataSetup(requestingContracts)
        dispatch(updateContractData(contractCommonData))
      } */

    const SetupValue = (value) => {
        const isPrimary = value === "primary" ? true : false
        switch (true) {
            case (isCurrency && isPrimary) :
                dispatch(switchCurrency(config.defaultCurrency))
                dispatch(selectWindow(windows.none))
                currentContract = isDefault ? config.saleContractAddrVRPUSDT : config.saleContractAddrVDAOUSDT
                break;
            case (isCurrency && !isPrimary) :
                dispatch(switchCurrency(config.selectableCurrency))
                dispatch(selectWindow(windows.none))
                currentContract = isDefault ? config.saleContractAddrVRPBUSD : config.saleContractAddrVDAOBUSD
                break;
            case (!isCurrency && isPrimary) :               
                dispatch(switchToken(config.defaultToken))
                dispatch(selectWindow(windows.none))
                currentContract = currencyIsDefault ? config.saleContractAddrVRPUSDT : config.saleContractAddrVRPBUSD
                break;
            case (!isCurrency && !isPrimary) :
                dispatch(switchToken(config.selectableToken))
                dispatch(selectWindow(windows.none))
                currentContract = currencyIsDefault ? config.saleContractAddrVDAOUSDT : config.saleContractAddrVDAOBUSD
                break;
        }

        if (isCurrency) {
            if (currentContract && State.account) {
                const currencyAddr =  isPrimary ? config.usdTokens[0].address : config.usdTokens[1].address
                AcknowApprovedAmount(currencyAddr, currentContract, State.account).then((res) => {

                    const reverseCurrency = currencyIsDefault ? 
                    config.selectableCurrency :
                    config.defaultCurrency

                    CurrentAllowanceSetupCustom (res, reverseCurrency, State.token)
                })
            }
        } else {
            if (currentContract && State.account) {
                const currencyAddr =  currencyIsDefault ? config.usdTokens[0].address : config.usdTokens[1].address
                AcknowApprovedAmount(currencyAddr, currentContract, State.account).then((res) => {

                    const reverseToken = isDefault? 
                    config.selectableToken :
                    config.defaultToken

                    CurrentAllowanceSetupCustom (res, State.currency, reverseToken)
                })
            }
        }
    }

    const content = (isCurrency) ? [{
        img: "images/icons/USDT.png",
        text: config.defaultCurrency
    },{
        img: "images/icons/BUSD.png",
        text: config.selectableCurrency
    }] : [{
        img: "images/icons/VRP.png",
        text: config.defaultToken
    },{
        img: "images/icons/VAO.png",
        text: config.selectableToken
    }]

    return(
        <div className="modal--window select--window">
           <div className="select--row" onClick={SetupValue.bind(this, "primary")}>
              <div className="select--icon">
                <img src={content[0].img} />
              </div>
              <div className="select--name">{content[0].text}</div>
            </div> 
            <div className="select--row" onClick={SetupValue.bind(this, "secondary")}>
              <div className="select--icon">
                <img src={content[1].img} />
              </div>
              <div className="select--name">{content[1].text}</div>
            </div>
        </div>
    )
}

export default SelectToken