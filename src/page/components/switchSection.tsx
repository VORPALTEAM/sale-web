import React from "react";

const SwitchSection = () => {

    return(
        <div className="switchSection">
            <div className="switchItem stageHeading">
                <h2 className="stageName">
                    Stage: seed round
                </h2>
            </div>
            <div className="switchItem stageCurrent">
                <div className="stageName active">
                    VAO
                </div>
                <div className="stageName">
                    VRP
                </div>
            </div>
        </div>
    )
}

export default SwitchSection;