import React from "react";
import DataHeading from "./dataHeading";
import CalculationForm from "./calcForm";
import TermsAgreeAction from "./termsAction";
import HeavyActionBtn from "../heavyBtn";
import StageBar from "../stageBar";

const PurchaseColumn = () => {

    const StageAction = () => {
        console.log("Approve")
    }

    return(
        <div className="officeColumn balanceColumn">
            <DataHeading h="GET YOUR TOKEN" />
            <CalculationForm />
            <TermsAgreeAction />
            <HeavyActionBtn text="Approve" onClick={StageAction} />
            <StageBar />
            </div>
    )
}

export default PurchaseColumn;