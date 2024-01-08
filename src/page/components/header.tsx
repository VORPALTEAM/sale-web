import React from "react";
import LogoFullIcon from "./icons/logoFull";
import MainMenu from "./menu";

const Header = () => {

    return(
        <div className="header">
            <div className="headerSection logoSection">
                <LogoFullIcon width={234} height={36} />
            </div>
            <div className="headerSection menuSection">
                <MainMenu />
            </div>
            <div className="headerSection authSection">Auth</div>
        </div>
    )
}

export default Header;