import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { defaultToken,
         handContractData } from '../config'

const StarTimer = () => {

    const State = useSelector(state => state)
    const [timeStatus, setTimeStatus] = useState("Starts in:") // Starts in (will end in, closed):
    const [countdown, setCountdown] = useState("00:00:00:00") 
    const [isTimerSetup, setIsTimerSetup] = useState(false)

    function UpdateTimer (totalSeconds) {

         if (totalSeconds === null) {
            setCountdown("")
            return;
         }
         if (totalSeconds === 0) {
            setCountdown("00:00:00:00")
            return;
         }
         const days = Math.floor(totalSeconds / 1000 / 60 / 60 / 24);
         const hours = Math.floor(totalSeconds / 1000 / 60 / 60) % 24;
         const minutes = Math.floor(totalSeconds / 1000 / 60) % 60;
         const seconds = Math.floor(totalSeconds / 1000) % 60;

         const daysString = days < 10 ? '0' + days : days;
         const hoursString = hours < 10 ? '0' + hours : hours;
         const minutesString = minutes < 10 ? '0' + minutes : minutes;
         const secondsString = seconds < 10 ? '0' + seconds : seconds;

         setCountdown(`${daysString}:${hoursString}:${minutesString}:${secondsString}`)
    }

    function TimerSetup () {
      if (!isTimerSetup) {

         const date = new Date().getTime()
         const saleEnd = State.contractData.saleEnd * 1000
         const saleStart = handContractData.saleStart * 1000

         if (date < saleStart) {
            setTimeStatus("Starts in:")
            UpdateTimer (saleStart - date)
            setInterval(() => {
               const ndate = new Date().getTime()
               UpdateTimer (saleStart - ndate)
            }, 1000)
         }
         if (date > saleEnd) {
            setTimeStatus("Closed")
            UpdateTimer (null)
         }
         if (date >= saleStart && date <= saleEnd) {
            setTimeStatus("Will end in")
            UpdateTimer (saleEnd - date)
            setInterval(() => {
               const ndate = new Date().getTime()
               UpdateTimer (saleEnd - ndate)
            }, 1000)
         }
         setIsTimerSetup(true)
      }
    } 

    return(
      <div className="sale--timer" onLoad={TimerSetup ()}>
            <div className={State.token === defaultToken ?
              "sale--timer--heading timer--vrp" :
              "sale--timer--heading timer--vdao"
              }>
               {`${timeStatus}`}
            </div>
            <div className={State.token === defaultToken ? 
            "timer--clock" :
            "timer--clock timer--vdao" }>
               {`${countdown}`}
            </div>
       </div>
    )
}

export default StarTimer