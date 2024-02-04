import React, { useState } from "react";
import { SelectVAO, SelectVRP } from "~/model";

const SwitchSection = () => {
  const [activeCurrency, SetAC] = useState("VAO");

  const ActivateVAO = () => {
    if (activeCurrency !== "VAO") {
      SetAC("VAO");
      SelectVAO();
    }
  };

  const ActivateVRP = () => {
    if (activeCurrency !== "VRP") {
      SetAC("VRP");
      SelectVRP();
    }
  };

  return (
    <div className="switchSection">
      <div className="switchItem stageHeading">
        <h3 className="stageName">
          <span>Stage:</span> pre-seed round
        </h3>
      </div>
      <div className="switchItem stageCurrent">
        <div
          className={`tokenName${activeCurrency === "VAO" ? " active" : ""}`}
          onClick={ActivateVAO}
        >
          VAO
        </div>
        <div
          className={`tokenName${activeCurrency === "VRP" ? " active" : ""}`}
          onClick={ActivateVRP}
        >
          VRP
        </div>
      </div>
    </div>
  );
};

export default SwitchSection;
