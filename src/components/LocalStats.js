import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { RequestLockedFunds, RequestUnLockedFunds, ContractDataSetup, RequestLeftTokens } from '../state/hooks'
import { updateLockedVRP, updateLockedVDAO, updateLeftVRP, updateLeftVDAO,
  updateUnLockedVRP, updateUnLockedVDAO, updateContractData } from '../state/reducer'
import * as config from "../config"

/* global Number */

const LocalStats = () => {

    const State = useSelector(state => state)
    const dispatch = useDispatch()

    const isDefault = State.token === config.defaultToken
    const lockedAmount = isDefault ? State.lockedVRP : State.lockedVDAO
    const unLockedAmount = isDefault ? State.unLockedVRP : State.unLockedVDAO
    
    const tokenPrice = isDefault ? config.priceVRP : config.priceVDAO
    const activeBalance = isDefault ? 
    State.amountUSDVRP : State.amountUSDVDAO
    const tokenAmountNumber = tokenPrice !== 0 ? parseFloat(activeBalance / tokenPrice) : 0
    const tokenAmount = Math.floor(tokenAmountNumber).toLocaleString('ua')
    const availableThisRound = isDefault ? config.saleAmountVRP : config.saleAmountVDAO
    const partOfAvailable = (Math.round((parseFloat(tokenAmountNumber) / parseFloat(availableThisRound)) * 10000) / 100).toLocaleString('ua')
    const totalForSale = isDefault ? config.totalSaleVRP : config.totalSaleVDAO
    const partOfTotal = (Math.round((parseFloat(tokenAmountNumber) / parseFloat(totalForSale)) * 10000) / 100).toLocaleString('ua')

    const saleDate = new Date(config.unLockDate * 1000).toLocaleString('ua')

    const requestingContracts = isDefault ? [
      config.saleContractAddrVRPUSDT,
      config.saleContractAddrVRPBUSD
    ] : [
      config.saleContractAddrVDAOUSDT,
      config.saleContractAddrVDAOBUSD
    ]

    const [VRPDataRequested, checkVRPRequest] = useState(false)
    const [VDAOataRequested, checkVDAORequest] = useState(false)
    const [commonDataRequested, checkCommonRequest] = useState(false)
    const [isCompared, CompareStyle] = useState(false)
    const [dynamicStyles, updateDynamicStyles] = useState({
       rightOne: 41,
       rightTwo: 79.5,
       rightThree: 37
    })

    
    const ColumnHeightSetup = () => {
       const LeftOne = document.querySelector(".amount--input")
       const leftTwo = document.querySelector(".amount--calculator")
       const RightOne = document.querySelector(".row--1")
       const RightTwoS = document.querySelectorAll(".row--2")
       const LeftThree = document.querySelector(".buy--column--left .stage--heading") 
       const RightThree = document.querySelector(".left--stage--heading")

       if (LeftOne && RightOne && document.documentElement) {
        const rowTwoBeginningElm = document.querySelectorAll(".number--key")[0]
        const rowTwoBegin = rowTwoBeginningElm ? rowTwoBeginningElm.getBoundingClientRect().y : 0
        const rowTwoEndElm = document.querySelector(".backspace--key")
        const rowTwoEnd = rowTwoEndElm ? rowTwoEndElm.getBoundingClientRect().bottom : 0
        const columnOne = LeftOne.getBoundingClientRect().height

        // const columnTwo = (leftTwo.getBoundingClientRect().height / 2)
        const columnTwo = ((rowTwoEnd - rowTwoBegin) / 2)
        const columnThree = LeftThree.getBoundingClientRect().height
        const scr = document.documentElement.clientWidth

        switch (true) {
           case scr < 768 : 
           updateDynamicStyles({
            rightOne: (columnOne - 5),
            rightTwo: (columnTwo - 13.5),
            rightThree: (columnThree - 1)
           })
           break;
           case (scr >= 769 && scr < 1920) :
           updateDynamicStyles({
              rightOne: (columnOne - 5),
              rightTwo: (columnTwo - 13),
              rightThree: (columnThree - 1)
            })
           break;
           case (scr >= 1920 && scr < 2739) :
           updateDynamicStyles({
              rightOne: (columnOne - 10),
              rightTwo: (columnTwo - 14),
              rightThree: (columnThree - 3)
            })
           break;
           case (scr > 2739) :
           updateDynamicStyles({
              rightOne: (columnOne - 10),
              rightTwo: (columnTwo - 16),
              rightThree: (columnThree - 3)
            })
           break;
        }

       }

    }

    useEffect(() => {
      if (!isCompared) {
        ColumnHeightSetup()
        window.addEventListener('resize', ColumnHeightSetup)
        CompareStyle(true)
      }
    }, [])

    //Personal data
    const SetupLocked = async (updateSale = false) => {

      if (!commonDataRequested) {
        checkCommonRequest(true)
      }

      if (updateSale) {
        const leftVRPUSDT = Number(await RequestLeftTokens(String(config.saleContractAddrVRPUSDT))) / Number(config.decimal)
        const leftVRPBUSD = Number(await RequestLeftTokens(String(config.saleContractAddrVRPBUSD))) / Number(config.decimal)
  
        const leftVDAOUSDT = Number(await RequestLeftTokens(String(config.saleContractAddrVDAOUSDT))) / Number(config.decimal)
        const leftVDAOBUSD = Number(await RequestLeftTokens(String(config.saleContractAddrVDAOBUSD))) / Number(config.decimal)
        
        dispatch(updateLeftVRP(Number(leftVRPUSDT) + Number(leftVRPBUSD)))
        dispatch(updateLeftVDAO(Number(leftVDAOUSDT) + Number(leftVDAOBUSD)))
      }

      if ((VRPDataRequested === true && isDefault) || (VDAOataRequested && !isDefault)) return false;

      if (State.account) {
        const locked = await RequestLockedFunds(requestingContracts, State.account)
        const unLocked = await RequestUnLockedFunds(requestingContracts, State.account)

        if (isDefault) {
          dispatch(updateLockedVRP(locked))
          dispatch(updateUnLockedVRP(unLocked))
          checkVRPRequest(true)
        } else {         
          dispatch(updateLockedVDAO(locked))
          dispatch(updateUnLockedVDAO(unLocked))
          checkVDAORequest(true)
        }
      } 
      return true;
    }

    if (!commonDataRequested) {
      setInterval(() => {
        SetupLocked(true)
      }, config.refreshPeriod)
    }

    if (!commonDataRequested) {
      SetupLocked(true)
    }  

    return(
      <>
        <div className="buy--column--cell row--1 value--row" style={{
           height: dynamicStyles.rightOne
        }}>
              <div className="value--text">
                {`${tokenAmount} ${State.token}`}
              </div>
            </div>
            <div className="buy--column--cell row--2" style={{
               height: dynamicStyles.rightTwo
            }}>
              <div className="value--subtitle">
                This round share
              </div>
              <div className="value--text">
              {`${partOfAvailable} %`}
              </div>
            </div>
            <div className="buy--column--cell row--2" style={{
               height: dynamicStyles.rightTwo
            }}>
              <div className="value--subtitle">
                All rounds share
              </div>
              <div className="value--text">
              {`${partOfTotal} %`}
              </div>
            </div>
            <div className="buy--column--cell left--stage--heading" style={{
               height: dynamicStyles.rightThree
            }}>
              <div className="stage--heading row--1 balance--row left--balance--row">
                Balance
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle red">
                 {lockedAmount > 0 ? `locked till ${saleDate.split(",")[0]}` : `locked`}
              </div>
              <div className="value--text">
              {`${(lockedAmount - unLockedAmount) < 0 ? 0 : (lockedAmount - unLockedAmount)} ${State.token}`}
              </div>
            </div>
            <div className="buy--column--cell row--2">
              <div className="value--subtitle green">
                 unlocked
              </div>
              <div className="value--text">
              {`${unLockedAmount} ${State.token}`}
              </div>
            </div>
      </>
    )
}

export default LocalStats