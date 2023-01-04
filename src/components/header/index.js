import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectWindow } from '../../state/reducer'
import ConnectWalletBtn from './ConnectWallet';
import { mainHost } from '../../config'

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
          <div className="menu--item has--submenu">
            <a href={`${mainHost}/swap`}>Trade</a>
            <div className="main--submenu">
              <div className="submenu--item submenu--item--first">
                 <a href={`${mainHost}/swap`}>Exchange</a>
              </div>
              <div className="submenu--item submenu--item--last">
                 <a href={`${mainHost}/liquidity`}>Liquidity</a>
              </div>
            </div>
          </div>
          <div className="menu--item has--submenu">
             <a href={`${mainHost}/farms`}>Earn</a>
             <div className="main--submenu">
              <div className="submenu--item submenu--item--first">
                <a href={`${mainHost}/farms`}>Farms</a>
              </div>
              <div className="submenu--item submenu--item--last">
                <a href={`${mainHost}/pools`}>Pools</a>
              </div>
            </div>
          </div>
          <div className="menu--item">
            <a href={`https://starmap.vorpal.finance/`}>Starmap</a>
          </div>
          <div className="menu--item green--btn">
            <a href={`https://sale.vorpal.finance/`}>Sale</a>
          </div>
          <div className="menu--item has--submenu">
            <a>...</a>
            <div className="main--submenu">
              <div className="submenu--item submenu--item--first">
                <a>Light paper</a>
              </div>
              <div className="submenu--item">
                <a>Blog</a>
              </div>
              <div className="submenu--item submenu--item--last">
                <a>Docs</a>
              </div>
            </div>
          </div>
        </div>
        <div className="wallet--section">
          <ConnectWalletBtn />
        </div>
      </header>
    )
}

export default Header