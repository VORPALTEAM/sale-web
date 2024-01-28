import React from "react";
import BalanceColumn from "./balanceColumn";
import PurchaseColumn from "./purchaseColumn";

const DataOffice = () => {

    return(
        <div className="dataOffice">
            <BalanceColumn />
            <PurchaseColumn />
        </div>
    )
}

export default DataOffice;