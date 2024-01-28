import React from "react";
import InfoIcon from "./icons/InfoIcon";
import HintRow from "./hint";

const TokenTopSection = () => {

    
    const HintAction = () => {
        console.log("Top hint triggered");
    }

  return (
    <div className="switchSection totalAmount">
      <div className="switchItem topAmount">
        <div className="infoContainer totalInvestAmount">
          <div className="infoRow heading">ROUND TOTAL VAO:</div>
          <div className="infoRow amount">42 000 000</div>
        </div>
      </div>
      <div className="ctnrBorder" />
      <div className="switchItem">
        <div className="descriptionContainer">
          <div className="descriptionText">
            Governance token of VORPAL DAO, which manages the entire gaming
            ecosystem and receives 30% of its total profits. Required for the
            generation of Plasma, from which Stars are created.
          </div>
          <HintRow text={"Why is the Star needed?"} action={HintAction} />
        </div>
      </div>
    </div>
  );
};

export default TokenTopSection;
