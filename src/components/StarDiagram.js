import { configure } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken, imageUrl, selectableToken } from '../config'

const StarDiagram = () => {

    const State = useSelector(state => state)
    const isDefault = State.token === defaultToken

    const imageSrc = () => {
      const scr = document.documentElement.clientWidth
      switch (true) {
        case (scr < 769) :
        return imageUrl("500", defaultToken)
        case (scr < 1600) :
        return imageUrl("1000", defaultToken)
        default:
        return imageUrl("2000", defaultToken)
      }
    }

    const imageSrcSelectable = () => {
      const scr = document.documentElement.clientWidth
      switch (true) {
        case (scr < 769) :
        return imageUrl("500", selectableToken)
        case (scr < 1600) :
        return imageUrl("1000", selectableToken)
        default:
        return imageUrl("2000", selectableToken)
      }
    }

    // animLoad.src = animImage

    return(
      <div className="star--image">
        <picture>
           {/* <source  media="(min-width: 1919px)" scrset={imageUrl("2000", State.token)} />
           <source media="(min-width: 769px)" scrset={imageUrl("1000", State.token)} /> */}
           <img src={isDefault ? imageSrc() : imageSrcSelectable} />
        </picture>
      </div>
    )
}

export default StarDiagram