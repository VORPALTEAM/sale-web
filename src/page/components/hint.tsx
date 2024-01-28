import React, { MouseEventHandler } from "react";
import InfoIcon from "./icons/InfoIcon";

interface MyButtonProps {
    text: string;
    onClick?: () => void; // Optional onClick function
}

const HintRow = (props: {
  text: string;
  addClass?: string;
  style?: React.CSSProperties;
  action?: () => void;
}) => {

  return (
    <div
      className={`hintRow${props.addClass || ""}`}
      style={props.style || {}}
      onClick={props.action}
    >
      <InfoIcon width={20} height={20} />
      <p>{props.text}</p>
    </div>
  );
};

export default HintRow;
