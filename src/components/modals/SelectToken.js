import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { switchToken, switchCurrency, selectWindow } from '../../state/reducer'
import * as config from '../../config'


const SelectToken = ({ pair }) => {

    const isCurrency = pair === "currency" ? true : false
    const dispatch = useDispatch()

    const SetupValue = (value) => {
        const isPrimary = value === "primary" ? true : false
        switch (true) {
            case (isCurrency && isPrimary) :
                dispatch(switchCurrency(config.defaultCurrency))
                dispatch(selectWindow("none"))
                break;
            case (isCurrency && !isPrimary) :
                dispatch(switchCurrency(config.selectableCurrency))
                dispatch(selectWindow("none"))
                break;
            case (!isCurrency && isPrimary) :
                dispatch(switchToken(config.defaultToken))
                dispatch(selectWindow("none"))
                break;
            case (!isCurrency && !isPrimary) :
                dispatch(switchToken(config.selectableToken))
                dispatch(selectWindow("none"))
                break;
        }
    }

    const content = (isCurrency) ? [{
        img: "images/icons/USDT.png",
        text: config.defaultCurrency
    },{
        img: "images/icons/BUSD.png",
        text: config.selectableCurrency
    }] : [{
        img: "images/icons/VRP.png",
        text: config.defaultToken
    },{
        img: "images/icons/VAO.png",
        text: config.selectableToken
    }]

    return(
        <div className="modal--window select--window">
           <div className="select--row" onClick={SetupValue.bind(this, "primary")}>
              <div className="select--icon">
                <img src={content[0].img} />
              </div>
              <div className="select--name">{content[0].text}</div>
            </div> 
            <div className="select--row" onClick={SetupValue.bind(this, "secondary")}>
              <div className="select--icon">
                <img src={content[1].img} />
              </div>
              <div className="select--name">{content[1].text}</div>
            </div>
        </div>
    )
}

export default SelectToken