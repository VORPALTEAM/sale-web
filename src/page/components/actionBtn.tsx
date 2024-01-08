import React from "react";
import { btnProps } from "~/types";

const ActionBtn = (props: btnProps) => {
    
    return(
        <div className="ActionBtn" onClick={props.onClick}>
            {props.text}
        </div>
    )
}

export default ActionBtn;