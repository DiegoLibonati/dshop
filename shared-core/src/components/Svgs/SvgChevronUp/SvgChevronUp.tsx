import type { JSX } from "react";
import type { SvgChevronUpProps } from "@shared-core/types/props";

const SvgChevronUp = ({ ...props }: SvgChevronUpProps): JSX.Element => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6 15L12 9L18 15"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SvgChevronUp;
