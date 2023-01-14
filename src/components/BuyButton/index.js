import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken, handContractData } from '../../config'
import { openInvest  } from '../../state/reducer';
import InvestSection from './InvestSection'

const BuyButton = () => {

  
    const State = useSelector(state => state)
    const dispatch = useDispatch()
    const nowD = new Date()
    const now = nowD.getTime()
    const beginMS = handContractData.saleStart * 1000
    const [time, setTime] = useState(now)
    const investOpened = State.isOpened

    const btnAddClass = State.token === defaultToken ? "vrp" : "vdao"
    const btnClassName = `value--subsection confirm--button${(time < beginMS) ? " btn--disabled" : ""} ${btnAddClass}${investOpened ? " invest--opened" : ""}`
    

    if (time < beginMS)  setTimeout(() => {
            const nowm = new Date()
            const nowt = nowm.getTime()
            setTime(nowt)
        }, (beginMS - time + 1000))

    const StartInvest = () => {
        const newState = State.isOpened
        dispatch(openInvest(!newState))
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