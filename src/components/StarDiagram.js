import { configure } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken, imageUrl, selectableToken } from '../config'

const StarDiagram = () => {

    const State = useSelector(state => state)
    const isDefault = State.token === defaultToken

    /*const imageSrc = () => {
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
    
    <picture>
              <source media="(min-width: 1900px)" scrset="/images/star/sun_2000.mp4" />
              <source media="(min-width: 1024px)" scrset="/images/star/sun_1000.mp4" />
              <img src="/images/star/sun_500.mp4" />
           </picture>

    */

    // animLoad.src = animImage

    return(
      <div className="star--image">       
           {isDefault ? 
           <video src="/images/star/sun_1000.mp4" autoplay="true" loop muted />  :
            <video src="/images/star/nova_1000.mp4" autoplay="true" loop muted />
            }      
      </div>
    )
}

export default StarDiagram