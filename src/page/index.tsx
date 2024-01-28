import React from "react";
import Header from "./components/header";
import MainDiagram from "./components/diagram";
import SwitchSection from "./components/switchSection";
import TokenTopSection from "./components/tokenTopSection";
import DataOffice from "./components/cabinet";

const Page = () => {

    return(
        <div className="pageCtnr">
            <div className="vorpalPage">
                <Header />
                <SwitchSection />
                <TokenTopSection />
                <MainDiagram />
                <DataOffice />
            </div>
        </div>
    )
}

export default Page;