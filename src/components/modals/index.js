import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NoWallet from './NoWallet'
import SuccessNotify from './Success'
import SelectToken from './SelectToken'
import { selectWindow } from '../../state/reducer'
import { windowNames } from '../../config'
 
const ModalContainer = () => {

    const State = useSelector(state => state)
    const modalR = State.modal

    const dispatch = useDispatch()

    const OverlayClose = () => {
      dispatch(selectWindow(windowNames.none))
    }

    function currentWindow ( windowName ) {
      switch (windowName) {
        case windowNames.nowallet :
          return <NoWallet />
        case windowNames.success  :
          return <SuccessNotify />
        case windowNames.selectToken :
          return <SelectToken pair="token" />
        case windowNames.selectCurrency :
          return <SelectToken pair="currency" />
        default: 
          return null;
      }
    }

    return(
        <>
          {currentWindow(modalR)}
          <div onClick={OverlayClose} className={modalR && modalR !== windowNames.none ? "modal--overlay active" : "modal--overlay"} />
        </>
    )
}

export default ModalContainer