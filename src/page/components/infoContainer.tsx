import React, { MouseEventHandler, ReactNode } from "react";
import WithdrawBtn from "./cabinet/withdrawBtn";

interface InfoContainerProps {
  h: string;
  d: string;
  addClass?: string;
  style?: React.CSSProperties;
  withdrawBtn?: boolean;
}

const InfoContainer: React.FC<InfoContainerProps> = ({ h, d, addClass, style, withdrawBtn }) => {
  return (
    <div className={`infoContainer${addClass || ""}`} style={style || {}}>
      <div className="infoRow heading">{h}</div>
      <div className={`infoRow amount + ${withdrawBtn ? " withBtn" : ""}`}>{d}{withdrawBtn ? 
      <WithdrawBtn /> : null}</div>
    </div>
  );
};

export default InfoContainer;
