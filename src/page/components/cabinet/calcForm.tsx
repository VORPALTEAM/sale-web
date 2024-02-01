import React from "react";
import InfoContainer from "../infoContainer";
import USDTCalcIcon from "../icons/USDT";
import VRPCalcIcon from "../icons/VRP";
import CalcBar from "./calcBar";

const CalculationForm = () => {
  return (
    <div className="calculationForm">
      <div className="calculationFormInner">
        <InfoContainer h={"VRP PRICE"} d={"0,0025"} addClass=" office" />
        <div className="calculationField">
           <div className="infoRow heading">YOU INVEST</div>
           <div className="calcInputRow">
              <input className="calcInputField" type="number" value="1000" />
              <div className="calcIcon">
                <USDTCalcIcon width={28} height={29} />
                <div className="calcIconText">USDT</div>
              </div>
           </div>
           <div className="calcInputHint">
              Approved 3 450 USDT
           </div>
        </div>
        <div className="calculationField">
           <div className="infoRow heading">YOU GET</div>
           <div className="calcInputRow">
              <input className="calcInputField" type="number" value="400000" />
              <div className="calcIcon">
                <VRPCalcIcon width={28} height={29} />
                <div className="calcIconText">VRP</div>
              </div>
           </div>
        </div>
        <CalcBar />
        <div className="partInfo">
          <div className="infoRow heading">SHARE:</div>
          <div className="partInfoRow">
            <InfoContainer h={"THIS ROUND"} d={"0,32%"} addClass=" office infoFt" />
            <InfoContainer h={"ALL ROUNDS"} d={"0,03%"} addClass=" office infoFt" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationForm;
