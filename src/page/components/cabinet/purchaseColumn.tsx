import React from "react";
import DataHeading from "./dataHeading";
import CalculationForm from "./calcForm";
import TermsAgreeAction from "./termsAction";

const PurchaseColumn = () => {

    return(
        <div className="officeColumn balanceColumn">
            <DataHeading h="GET YOUR TOKEN" />
            <CalculationForm />
            <TermsAgreeAction />
            </div>
    )
}

export default PurchaseColumn;