import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken } from '../config'

const BuyButton = () => {

    const State = useSelector(state => state)

    return(
       <div className={State.token === defaultToken ? 
       "value--subsection confirm--button vrp" :
   "value--subsection confirm--button vdao"}>
          INVEST
       </div>
    )
}

export default BuyButton 