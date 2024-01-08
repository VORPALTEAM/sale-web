import React from "react";
import { menu } from "../content/menu";

const MainMenu = () => {

    return(
        <div className="mainMenu">
            {menu.map((item, index) => {
                return(
                    <div key={`mitm_${index * 4.567}`} className={`mainMenuItem${item.active ? " active" : ""}`}>
                        <a href={item.url}>{item.name}</a>
                    </div>
                )
            })}
        </div>
    )
}

export default MainMenu;