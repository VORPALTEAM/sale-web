import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken } from '../config'

const StarTimer = () => {

    const State = useSelector(state => state)

    return(
      <div className="sale--timer">
            <div className={State.token === defaultToken ?
              "sale--timer--heading timer--vrp" :
              "sale--timer--heading timer--vdao"
              }>
               Starts in (will end in, closed):
            </div>
            <div className={State.token === defaultToken ? 
            "timer--clock" :
            "timer--clock timer--vdao" }>
               00:00:00:00
            </div>
       </div>
    )
}

export default StarTimer