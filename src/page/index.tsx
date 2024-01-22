import React from "react";
import Header from "./components/header";
import MainDiagram from "./components/diagram";

const Page = () => {

    return(
        <div className="pageCtnr">
            <div className="vorpalPage">
                <Header />
                <MainDiagram />
            </div>
        </div>
    )
}

export default Page;