import React from "react";
import Header from "./components/header";
import MainDiagram from "./components/diagram";
import SwitchSection from "./components/switchSection";
import TokenTopSection from "./components/tokenTopSection";
import DataOffice from "./components/cabinet";

const Page = () => {
  return (
    <div className="pageCtnr">
      <div className="vorpalPage">
        <Header />
        <div className="pageContainer">
          <SwitchSection />
          <TokenTopSection />
          <MainDiagram />
          <DataOffice />
        </div>
      </div>
    </div>
  );
};

export default Page;
