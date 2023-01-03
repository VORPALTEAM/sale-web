import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

const GlobalStats = () => {

    const State = useSelector(state => state)
    
    return(
      <div className="stage--stats">
        <p><b>price:</b> 0.0025$</p>
        <p><b>available:</b> 12 000 000</p>
        <p><b>sold:</b> 2 000 000</p>
        <p><b>burned:</b> 0</p>
        <p><b>Max supply:</b> 21 000 000 000</p>
        <p><b>For current round:</b> 14 000 000</p>
        <p><b>For sale total:</b> 30 000 000</p>
        <p><b>Total sold:</b> 2 000 000</p>
        <p><b>Total burned:</b> 0</p>
    </div>
    )
}

export default GlobalStats