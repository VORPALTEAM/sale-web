import React from "react";
import InfoIcon from "./icons/InfoIcon";

const TokenTopSection = () => {
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
          <div className="hintRow">
            <InfoIcon width={20} height={20} />
            <p>Why is the Star needed?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenTopSection;
