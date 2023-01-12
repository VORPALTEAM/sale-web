import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken, handContractData } from '../../config'
import InvestSection from './InvestSection'

const BuyButton = () => {

    const [investOpened, openInvest] = useState(false)
    const State = useSelector(state => state)
    const nowD = new Date()
    const now = nowD.getTime()
    const beginMS = handContractData.saleStart * 1000
    const [time, setTime] = useState(now)

    const btnAddClass = State.token === defaultToken ? "vrp" : "vdao"
    const btnClassName = `value--subsection confirm--button${(time < beginMS) ? " btn--disabled" : ""} ${btnAddClass}${investOpened ? " invest--opened" : ""}`
    

    if (time < beginMS)  setTimeout(() => {
            const nowm = new Date()
            const nowt = nowm.getTime()
            setTime(nowt)
        }, (beginMS - time + 1000))

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