import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import NoWallet from './NoWallet'
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
          break;
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