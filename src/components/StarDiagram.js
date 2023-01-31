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
    const [sessionCode, updateSession] = useState(false)

    const soldPercent = isDefault ? (soldVRP / saleAmountVRP) : 
    (soldVDAO / saleAmountVDAO )
    // const soldPercent = 0.5

    const fixedRotateValue = 90 * (1 - soldPercent)
    const fixedTransformFirst = `rotate(${(353 * (1 - soldPercent))}deg)`
    const fixedTransformSecond = `rotate(${(149 * (1 - soldPercent))}deg)`
    const fixedTransformThird = `rotate(${-((186 * (1 - soldPercent)))}deg)`
    const scrW = document.documentElement.clientWidth
    const scr = scrW * 0.025
    const scrH = document.documentElement.clientHeight

    function widthProp () {
       switch (true) {
          case (scrW < 769) :
          return 0.69
          case (scrW >= 769 && scrW < 1920) :
          return 0.7
          case (scrW >= 1920) :
          return 0.72
          default :
          return 0.7
       }
    }

    const imageMarginLeft = -baseImagePosition.width * (1 - widthProp()) - ((baseImagePosition.width * (1 - soldPercent)) / 2) - scr - (79 * (1 - soldPercent))
    const imageMarginTop = baseImagePosition.height * ((1 - widthProp()) / 2)


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
      if (!sessionCode) {
        updateSession(Math.round(Math.random() * 100000))
      }
      const rz = window.addEventListener('resize', UpdatePosition)
    }, [])
    
    // animLoad.src = animImage

    return(
      <div className="star--image" onLoad={SetupPosition}>       

           <video src={isDefault ?`/images/star/sun_1000.mp4?${sessionCode}` : `/images/star/nova_1000.mp4?${sessionCode}` } alt="VRP Star" 
           autoPlay={true} loop muted playsInline type="video/mp4" />  
           <div className={showRise ? "rise--anim" : "rise--anim __hidden"}>
              <img src="/images/rise/1.png" style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: baseImagePosition.width * widthProp(),
                 height: baseImagePosition.height * widthProp(),
                 transform : fixedTransformFirst
              }} />
              <img src="/images/rise/2.png" style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: -baseImagePosition.width * widthProp(),
                 height: -baseImagePosition.height * widthProp(),
                 transform : fixedTransformSecond
              }} />
              <img src="/images/rise/3.png" style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: baseImagePosition.width * widthProp(),
                 height: baseImagePosition.height * widthProp(),
                 transform : fixedTransformThird
              }} />
              <img className="rotate--anim" src="/images/rise/4.png"  style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: baseImagePosition.width * widthProp(),
                 height: baseImagePosition.height * widthProp()
              }} />
              <img className="rotate--anim--reverse" src="/images/rise/5.png"  style={{
                 marginTop: imageMarginTop,
                 marginLeft: imageMarginLeft,
                 width: baseImagePosition.width * widthProp(),
                 height: baseImagePosition.height * widthProp()
              }} />
           </div>
      </div>
    )
}

export default StarDiagram