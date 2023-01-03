import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken } from '../config'

const BuyButton = () => {

    const [investOpened, openInvest] = useState(false)
    const State = useSelector(state => state)
    const btnAddClass = State.token === defaultToken ? "vrp" : "vdao"
    const btnClassName = `value--subsection confirm--button ${btnAddClass}${investOpened ? " invest--opened" : ""}`

    const StartInvest = () => {
        console.log("ok")
        const newState = investOpened ? false : true
        openInvest(newState)
    }

    return(
       <div className={btnClassName} onClick={StartInvest}>
          INVEST
          <div className={`opened--arrow ${investOpened ? " active" : ""} ${btnAddClass}`} />
       </div>
    )
}

export default BuyButton 