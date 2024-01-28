import React from "react";
import DataHeading from "./dataHeading";
import InfoContainer from "../infoContainer";
import WithdrawBtn from "./withdrawBtn";
import HintRow from "../hint";

const BalanceColumn = () => {

    return(
        <div className="officeColumn balanceColumn">
            <div className="balanceItem globalData">
                <DataHeading h="All rounds" />
                <InfoContainer addClass=" office" h="Max suply:" d="21 000 000 000" />
                <InfoContainer addClass=" office" h="For sale total:" d="420 000 000" />
                <InfoContainer addClass=" office" h="Total sold:" d="11 410 800" />
                <InfoContainer addClass=" office" h="Total burned:" d="0" />
            </div>
            <div className="balanceItem globalData">
                <DataHeading h="Your balance" />
                <InfoContainer addClass=" office" h="Locked:" d="0 VAO" />
                <InfoContainer addClass=" office" h="Unlocked:" d="0 VAO" withdrawBtn={true} style={{
                    marginBottom: 40
                }}  />
                <HintRow text="How to buy?" />
            </div>
        </div>
    )
}

export default BalanceColumn;