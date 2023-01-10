import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { updateUSDVRP, updateUSDVDAO } from '../state/reducer'
import { defaultToken, maxInvestments } from '../config'

const AmountInput = () => {

    const State = useSelector(state => state)
    const dispatch = useDispatch()
    const activeBalance = State.token === defaultToken ? State.amountUSDVRP : State.amountUSDVDAO

    function DispatchValue (newValue) {
      State.token === defaultToken ?
      dispatch(updateUSDVRP(newValue)) :
      dispatch(updateUSDVDAO(newValue)) 
    }

    const ValueOnChange = (event) => {
      
      let newValue = event.target.value.toString()
      if (newValue[0] === '0' && newValue !== '0') {

        newValue = newValue.substring(1)
      }

      if (newValue <= maxInvestments) DispatchValue (newValue)
    }

    const KeyPressWeb = (event) => {
      const dt = event.target.getAttribute("data")
      switch (dt) {
        case "backspace" :
          const stringValue = `${activeBalance}`
          const newValue = stringValue.length > 1 ? stringValue.slice(0, -1) : "0"
          DispatchValue (newValue)
          break;
        case "." :
          let lastValue = `${activeBalance}`
          /* if (lastValue.indexOf(".") < 0) {
            lastValue += "."
          } */
          DispatchValue (lastValue)
          break;
        default:
          const dgValue = (activeBalance === 0 || activeBalance === "0") ? `${dt}` : `${activeBalance}` + `${dt}`
          if(parseInt(dgValue) <= maxInvestments) {
            DispatchValue (dgValue)
          }
          break;
      }
    }

    /* const InputFilter = (event) => {
      if (event.code === "Backspace") {
        console.log(event)
        if (activeBalance < 10) {
          DispatchValue ("")
        }
      }
    } */

    return(
      <>
        <div className="amount--input">
              <input name="amount" type="number" max={maxInvestments}
              value={ activeBalance } onChange={ValueOnChange} />
            </div>
            <div className="amount--calculator">
              <div className="number--key" data="1" onClick={KeyPressWeb}>
                1
              </div>
              <div className="number--key" data="2" onClick={KeyPressWeb}>
                2
              </div>
              <div className="number--key" data="3" onClick={KeyPressWeb}>
                3
              </div>
              <div className="number--key" data="4" onClick={KeyPressWeb}>
                4
              </div>
              <div className="number--key" data="5" onClick={KeyPressWeb}>
                5
              </div>
              <div className="number--key" data="6" onClick={KeyPressWeb}>
                6
              </div>
              <div className="number--key" data="7" onClick={KeyPressWeb}>
                7
              </div>
              <div className="number--key" data="8" onClick={KeyPressWeb}>
                8
              </div>
              <div className="number--key" data="9" onClick={KeyPressWeb}>
                9
              </div>
              <div className="number--key" data="0" onClick={KeyPressWeb}>
                0
              </div>
              <div className="number--key backspace--key" data="backspace" onClick={KeyPressWeb}>
                Backspace
              </div>
            </div>
      </>
    )
}

export default AmountInput