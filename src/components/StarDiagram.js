import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken, imageUrl } from '../config'

const StarDiagram = () => {

    const State = useSelector(state => state)

    const imageSrc = () => {
      const scr = document.documentElement.clientWidth
      switch (true) {
        case (scr < 769) :
        return imageUrl("500", State.token)
        case (scr < 1600) :
        return imageUrl("1000", State.token)
        default:
        return imageUrl("2000", State.token)
      }
    }

    // animLoad.src = animImage

    return(
      <div className="star--image">
        <picture>
           <source  media="(min-width: 1919px)" scrset={imageUrl("2000", State.token)} />
           <source media="(min-width: 769px)" scrset={imageUrl("1000", State.token)} />
           <img src={imageSrc()} />
        </picture>
      </div>
    )
}

export default StarDiagram