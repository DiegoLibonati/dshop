import type { JSX } from "react";
import type { SvgCheckProps } from "@shared-core/types/props";

const SvgCheck = ({ ...props }: SvgCheckProps): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 1920 1920"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1743.858 267.012 710.747 1300.124 176.005 765.382 0 941.387l710.747 710.871 1209.24-1209.116z"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default SvgCheck;
