import React from "react";
import { iconProps } from "~/types";

const USDTCalcIcon = (props: iconProps) => {
  return (
    <svg
      width={props.width}
      height={props.height}
      viewBox="0 0 28 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14 28.5C21.732 28.5 28 22.232 28 14.5C28 6.76801 21.732 0.5 14 0.5C6.26801 0.5 0 6.76801 0 14.5C0 22.232 6.26801 28.5 14 28.5Z"
        fill="#00B23C"
      />
      <path
        d="M9.22443 10.392V8.36364H18.7812V10.392H15.2188V20H12.7869V10.392H9.22443Z"
        fill="white"
      />
    </svg>
  );
};

export default USDTCalcIcon;
