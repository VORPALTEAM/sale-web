import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectWindow } from '../../state/reducer';
import * as config from '../../config'


const SuccessNotify = () => {

    const State = useSelector(state => state)
    const dispatch = useDispatch()
    const isDefault = State.token === config.defaultToken
    const headingClass = `modal--heading ${isDefault ? "vrp" : "vdao"}`
    const descrClass = `modal--description ${isDefault ? "vrp" : "vdao"}`
    const btnClass =  `window--action-button ${isDefault ? "vrp" : "vdao"}`

    const CloseWindow = () => {
        dispatch(selectWindow(config.windowNames.none))
    }
    
    return(
        <div className="modal--env success--modal">
            <div className="modal--container">
                <div className={headingClass}>
                   <h3>Congratulate!</h3>
                </div>
                <div className={descrClass}>
                    Your tokens is now add to locked balance. During the westing period
                    it's will became unlocked and available to withdraw.
                </div>
                <div className={btnClass} onClick={CloseWindow}>
                    Ok
                </div>
            </div>
        </div>
    )
}

export default SuccessNotify