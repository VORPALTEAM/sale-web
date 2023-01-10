import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken } from '../config'

const StarDiagram = () => {

    const State = useSelector(state => state)
    const [isLoaded, setLoaded] = useState(false)
    const isDefault = State.token === defaultToken
    const staticImage = isDefault ? "images/star_vrp.png" : "images/star_vdao.png"
    const animImage = isDefault ? "images/sun.webp" : "images/star_vdao.png"

    const animLoad = new Image(400)
    animLoad.addEventListener('load', () => {
      setLoaded(true)
    })
    animLoad.src = animImage


    return(
      <div className="star--image">
        <img src={!isLoaded? staticImage : animImage} />
      </div>
    )
}

export default StarDiagram