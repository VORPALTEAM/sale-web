import React from 'react';
import ConnectWalletBtn from './ConnectWallet';
import { menu, styles } from './MenuConfig'

const Header = () => {

    const MenuSection = ({ isMobile = false}) => {
      return(
        <div className={isMobile ? "menu--section mobile--menu--ctnr" : "menu--section"}>
        {menu.map((item) => {
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
            <div className={itemClass}>
             <a href={item.url}>{item.name}</a>
             {hasSubs ? <div className={`main--submenu${isMobile ? " mobile--sub" : ""}`}>
                {item.submenu.map((subitem, index) => {
                   const siClass = `submenu--item${(index === 0) ? 
                  " submenu--item--first" :((index === item.submenu.length - 1) ?
                " submenu--item--last" : "")}`
                   return(
                    <div className={siClass}>
                       <a href={subitem.url}>{subitem.name}</a>
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
          <img src="images/logo.svg" />
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