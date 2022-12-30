import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { actionNames, switchToken } from '../state/reducer'
import { defaultToken, selectableToken } from '../config'

const TokenSelector = () => {

    const [secondToken, selectToken] = useState(false)

    const dispatch = useDispatch()
    
    const checkBox = (event) => {
      selectToken(event.target.checked)

      const actualToken = event.target.checked ? selectableToken : defaultToken
      dispatch(switchToken(actualToken))

      return !event.target.checked
    }

    return(
       <div className="token--selector">
        <div className={`token token--vrp ${secondToken ? 'inActive' : ''}`}>{defaultToken}</div>
        <label className="switch--token">
           <input type="checkbox" onChange={checkBox} />
           <span className="checker round"></span>
        </label>
        <div className={`token token--vdao ${!secondToken ? 'inActive' : ''}`}>{selectableToken}</div>
      </div>
    )
}

export default TokenSelector