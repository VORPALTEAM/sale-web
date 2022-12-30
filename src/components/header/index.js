import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectWindow } from '../../state/reducer'
import ConnectWalletBtn from './ConnectWallet';

const Header = () => {

    const dispatch = useDispatch()

    const checkWallet = (event) => {
        dispatch(selectWindow("connectwallet"))
    }

    return(
       <header className="dex--header">
        <div className="logo--section">
          <img src="images/logo.svg" />
        </div>
        <div className="menu--section">
          <div className="menu--item">
            Trade
          </div>
          <div className="menu--item">
            Earn
          </div>
          <div className="menu--item">
            Starmap
          </div>
          <div className="menu--item green--btn">
            Sale
          </div>
          <div className="menu--item has--submenu">
            ...
          </div>
        </div>
        <div className="wallet--section">
          <ConnectWalletBtn />
        </div>
      </header>
    )
}

export default Header