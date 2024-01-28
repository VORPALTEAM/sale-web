import React from "react";
import DataHeading from "./dataHeading";
import CalculationForm from "./calcForm";

const PurchaseColumn = () => {

    return(
        <div className="officeColumn balanceColumn">
            <DataHeading h="GET YOUR TOKEN" />
            <CalculationForm />
            </div>
    )
}

export default PurchaseColumn;