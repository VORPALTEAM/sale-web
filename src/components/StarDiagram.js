import { configure } from '@testing-library/react';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken, imageUrl, selectableToken, saleAmountVRP, saleAmountVDAO } from '../config'

const StarDiagram = () => {

    const State = useSelector(state => state)
    const isDefault = State.token === defaultToken
    const [ baseImagePosition, setBasePosition] = useState({
       top: 0,
       left: 0,
       width: 500,
       height : 500
    })
    const [showRise, toShowRise] = useState(false)
    const soldVRP = saleAmountVRP - State.leftVRP
    const soldVDAO = saleAmountVDAO - State.leftVDAO

    const soldPercent = isDefault ? (soldVRP / saleAmountVRP) : 
    (soldVDAO / saleAmountVDAO )
    // const soldPercent = 0.5
    const widthProp = 0.7

    const fixedRotateValue = 90 * (1 - soldPercent)
    const fixedTransform = `rotate(${fixedRotateValue}deg)`
    const fixedTransformReverse = `rotate(${-fixedRotateValue}deg)`
    const scr = document.documentElement.clientWidth * 0.025
    const scrH = document.documentElement.clientHeight

    const imageMarginLeft = -baseImagePosition.width * (1 - widthProp) - ((baseImagePosition.width * (1 - soldPercent)) / 2) - scr
    const imageMarginTop = baseImagePosition.height * ((1 - widthProp) / 2)


    const UpdatePosition = () => {

      const baseImage = document.querySelector(".star--image video")
      const basePosition = baseImage.getBoundingClientRect()

      setBasePosition({
        top: basePosition.y,
        left: basePosition.x,
        width: basePosition.width,
        height : basePosition.height
      })

      toShowRise(true)
    }

    const SetupPosition = () => {
      setTimeout(() => {
        UpdatePosition()
      }, 2000)
    }


    useEffect(() => {
      const rz = window.addEventListener('resize', UpdatePosition)
    }, [])
    
    // animLoad.src = animImage

    return(
      <div className="star--image" onLoad={SetupPosition}>       

           <video src={isDefault ?"/images/star/sun_1000.mp4" : "/images/star/nova_1000.mp4" } alt="VRP Star" 
           autoPlay={true} loop muted playsInline />  
           {/* <div className={showRise ? "rise--anim" : "rise--anim __hidden"}>
              <img src="/images/rise/1.png" style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: baseImagePosition.width * widthProp,
                 height: baseImagePosition.height * widthProp,
                 transform : fixedTransform
              }} />
              <img src="/images/rise/2.png" style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: -baseImagePosition.width * widthProp,
                 height: -baseImagePosition.height * widthProp,
                 transform : fixedTransformReverse
              }} />
              <img src="/images/rise/3.png" style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: baseImagePosition.width * widthProp,
                 height: baseImagePosition.height * widthProp,
                 transform : fixedTransform
              }} />
              <img className="rotate--anim" src="/images/rise/4.png"  style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: baseImagePosition.width * widthProp,
                 height: baseImagePosition.height * widthProp
              }} />
           </div> */}
      </div>
    )
}

export default StarDiagram