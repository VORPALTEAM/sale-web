import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken, handContractData } from '../../config'
import InvestSection from './InvestSection'

const BuyButton = () => {

    const [investOpened, openInvest] = useState(false)
    const State = useSelector(state => state)
    const now = new Date().getTime()
    const [disabledStatus, setDisabled] = useState(now < (handContractData.saleStart * 1000))
    /* console.log(now)
    console.log(handContractData.saleStart)
    console.log(disabledStatus)
    console.log(now < handContractData.saleStart) */
    const btnAddClass = State.token === defaultToken ? "vrp" : "vdao"
    const btnClassName = `value--subsection confirm--button${disabledStatus ? " btn--disabled" : ""} ${btnAddClass}${investOpened ? " invest--opened" : ""}`
    
    if (disabledStatus) {
        setTimeout(() => {
            setDisabled(false)
        }, (now - handContractData.saleStart) * 1000)
    }
    const StartInvest = () => {

        const newState = investOpened ? false : true
        openInvest(newState)
    }

    return(
       <div className={`invest--section${investOpened ? " opened" : ""}`}>
        <div className={btnClassName} onClick={StartInvest}>
          INVEST
          <div className={`opened--arrow ${investOpened ? " active" : ""} ${btnAddClass}`} />
       </div>
       {investOpened ? <InvestSection /> : null}
       </div>
    )
}

export default BuyButton 