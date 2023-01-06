import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NoWallet from './NoWallet'
import SuccessNotify from './Success'
import SelectToken from './SelectToken'
import { selectWindow } from '../../state/reducer'
 
const ModalContainer = () => {

    const State = useSelector(state => state)
    const modalR = State.modal

    const dispatch = useDispatch()

    const OverlayClose = () => {
      dispatch(selectWindow("none"))
    }

    function currentWindow ( windowName ) {
      switch (windowName) {
        case "nowallet" :
          return <NoWallet />
        case "success" :
          return <SuccessNotify />
        case "selectToken" :
          return <SelectToken pair="token" />
        case "selectCurrency" :
          return <SelectToken pair="currency" />
        default: 
          return null;
      }
    }

    return(
        <>
          {currentWindow(modalR)}
          <div onClick={OverlayClose} className={modalR && modalR !== "none" ? "modal--overlay active" : "modal--overlay"} />
        </>
    )
}

export default ModalContainer