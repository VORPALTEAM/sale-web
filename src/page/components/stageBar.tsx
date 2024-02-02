import React from "react";

const StageBar = () => {
  return (
    <div className="actionStageCtnr">
      <div className="actionStageBar">
        <div className="stageBorder passed" />
        <div className="stageLine passed" />
        <div className="stageBorder passed" />
        <div className="stageLine" />
        <div className="stageBorder" />
      </div>
      <div className="stageNameCtnr">
        <div className="barStageName">Connect</div>
        <div className="barStageName">Approve</div>
        <div className="barStageName">Invest</div>
      </div>
    </div>
  );
};

export default StageBar;
