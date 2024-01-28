import React, { MouseEventHandler } from "react";

const WithdrawBtn = () => {

    const WithdrawAction = (event: React.MouseEvent<HTMLDivElement>) => {
        console.log("Withdraw action triggered");
    }

    return(
        <div className="actionBtn small withdrawBtn" onClick={WithdrawAction}>
           Withdraw
        </div>
    )
}

export default WithdrawBtn