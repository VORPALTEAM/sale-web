import React from 'react';
import ConnectWalletBtn from './ConnectWallet';
import { menu, styles } from './MenuConfig'
import { mainHost } from '../../config'

const Header = () => {

    const MenuSection = ({ isMobile = false}) => {
      return(
        <div className={isMobile ? "menu--section mobile--menu--ctnr" : "menu--section"}>
        {menu.map((item ,index) => {
          const hasSubs = item.submenu.length > 0 ? true : false
          let itemClass = "menu--item"
          if (hasSubs) {
            itemClass += " has--submenu"
          }
          if (item.style === styles.starmap) {
            itemClass += " starmap--btn"
          }
          if (item.style === styles.sale) {
            itemClass += " green--btn"
          }

          return(
            <div className={itemClass} key={"mainmenu"+index}>
             <a href={item.url} target="_blank">{item.name}</a>
             {hasSubs ? <div key={"submenu_"+index} className={`main--submenu${isMobile ? " mobile--sub" : ""}`}>
                {item.submenu.map((subitem, ind) => {
                   const siClass = `submenu--item${(ind === 0) ? 
                  " submenu--item--first" :((ind === item.submenu.length - 1) ?
                " submenu--item--last" : "")}`
                   return(
                    <div key={"subs_"+index+"_"+ind} className={siClass}>
                       <a href={subitem.url} target="_blank">{subitem.name}</a>
                    </div>
                   )
                })} 
             </div> : null}
        </div>
          )
        })}
      </div>
      )
    }


    return(
       <header className="dex--header">
        <div className="logo--section">
          <a href={''}><img src="images/logo.svg" /></a>
        </div>
           <MenuSection />
        <div className="wallet--section">
          <ConnectWalletBtn />
        </div>
        <div className="mobile--menu">
           <MenuSection isMobile={true} />
        </div>
      </header>
    )
}

export default Header