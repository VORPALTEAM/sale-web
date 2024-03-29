import React from 'react';
import ConnectWalletBtn from './ConnectWallet';
import { menu, styles } from './MenuConfig'
import { mainHost } from '../../config'

const MenuSection = ({ isMobile = false}) => {

  const ExecUrl = (event) => {
      const url = event.target.dataset.url
      window.open(url, "blank")
  }

  return(
    <div className={isMobile ? "menu--section mobile--menu--ctnr" : "menu--section"}>
    {menu.map((item ,index) => {
      const hasSubs = item.submenu.length > 0 ? true : false
      let itemClass = "menu--item" + (index === 0 ? " menu--item--first" : (
        (index === menu.length - 1) ? " menu--item--last" : ""))
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
         {hasSubs ? <div key={"submenu_"+index} className={`main--submenu${isMobile ? " mobile--sub" : ""}`}
         style={isMobile ? {
            marginLeft: -1 * (15 + (4*index))
         } : null}>
            {item.submenu.map((subitem, ind) => {
               const siClass = `submenu--item${(ind === 0) ? 
              " submenu--item--first" :((ind === item.submenu.length - 1) ?
            " submenu--item--last" : "")}`
               return(
                <div key={"subs_"+index+"_"+ind} className={siClass} 
                data-url={subitem.url} onClick={ExecUrl}>
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

const Header = () => {


    return(
       <header className="dex--header">
        <div className="logo--section">
          <a href={'https://vorpal.finance/'}><img src="images/logo.svg" /></a>
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