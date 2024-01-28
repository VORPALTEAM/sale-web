import React from "react";
import Header from "./components/header";
import MainDiagram from "./components/diagram";
import SwitchSection from "./components/switchSection";
import TokenTopSection from "./components/tokenTopSection";

const Page = () => {

    return(
        <div className="pageCtnr">
            <div className="vorpalPage">
                <Header />
                <SwitchSection />
                <TokenTopSection />
                <MainDiagram />
            </div>
        </div>
    )
}

export default Page;