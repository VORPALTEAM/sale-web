import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actionNames, switchToken } from '../state/reducer'
import { defaultToken, selectableToken } from '../config'
import { configureStore } from '@reduxjs/toolkit';

const TokenSelector = () => {

    const dispatch = useDispatch()
    const State = useSelector(state => state)
    
    const checkBox = (event) => {

      const actualToken = State.token === defaultToken ? selectableToken : defaultToken
      dispatch(switchToken(actualToken))

      return !event.target.checked
    }

    return(
       <div className="token--selector">
        <div className={`token token--vrp ${State.token !== defaultToken ? 'inActive' : ''}`}>{defaultToken}</div>
        <label className="switch--token">
           <input type="checkbox" onChange={checkBox} 
           defaultChecked={State.token === defaultToken ? "" : "checked"}
           checked={State.token === defaultToken ? "" : "checked"} />
           <span className="checker round"></span>
        </label>
        <div className={`token token--vdao ${State.token === defaultToken ? 'inActive' : ''}`}>{selectableToken}</div>
      </div>
    )
}

export default TokenSelector