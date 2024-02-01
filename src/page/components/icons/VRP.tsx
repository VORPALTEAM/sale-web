import React from "react";
import { iconProps } from "~/types";

const VRPCalcIcon = (props: iconProps) => {
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
        fill="url(#paint0_radial_142_508)"
      />
      <path
        d="M15.4849 14.5C15.4803 18.6155 14.9869 22.7159 14.0149 26.715C13.0336 22.717 12.5307 18.6166 12.5169 14.5C12.5307 10.3834 13.0336 6.28295 14.0149 2.28499C14.9869 6.28408 15.4803 10.3845 15.4849 14.5Z"
        fill="black"
      />
      <path
        d="M16.072 11.938C17.2009 11.938 18.116 11.0229 18.116 9.89402C18.116 8.76515 17.2009 7.85002 16.072 7.85002C14.9431 7.85002 14.028 8.76515 14.028 9.89402C14.028 11.0229 14.9431 11.938 16.072 11.938Z"
        fill="white"
      />
      <defs>
        <radialGradient
          id="paint0_radial_142_508"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(13.4547 -3.126) scale(28.987)"
        >
          <stop offset="0.23" stopColor="#FFF883" />
          <stop offset="0.31" stopColor="#FCF882" />
          <stop offset="0.38" stopColor="#F2F87E" />
          <stop offset="0.45" stopColor="#E1F778" />
          <stop offset="0.5" stopColor="#C9F770" />
          <stop offset="0.56" stopColor="#AAF765" />
          <stop offset="0.62" stopColor="#84F658" />
          <stop offset="0.67" stopColor="#57F548" />
          <stop offset="0.72" stopColor="#25F436" />
          <stop offset="0.74" stopColor="#14F430" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default VRPCalcIcon;
