import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken } from '../config'

const StarDiagram = () => {

    const State = useSelector(state => state)

    return(
      <div className="star--image">
        <img src={State.token === defaultToken ? "images/star_vrp.png" : "images/star_vdao.png"} />
      </div>
    )
}

export default StarDiagram