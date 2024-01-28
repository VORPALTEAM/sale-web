import React from "react";

const SwitchSection = () => {

    return(
        <div className="switchSection">
            <div className="switchItem stageHeading">
                <h3 className="stageName">
                    <span>Stage:</span> pre-seed round
                </h3>
            </div>
            <div className="switchItem stageCurrent">
                <div className="tokenName active">
                    VAO
                </div>
                <div className="tokenName">
                    VRP
                </div>
            </div>
        </div>
    )
}

export default SwitchSection;