import type { JSX } from "react";
import type { ButtonBlackProps } from "@shared-core/types/props";

import "@shared-core/components/Buttons/ButtonBlack/ButtonBlack.css";

const ButtonBlack = ({
  ariaLabel,
  children,
  className,
  rounded,
  onClick,
}: ButtonBlackProps): JSX.Element => {
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      className={`button-black ${className} ${rounded && "button-black--rounded"}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ButtonBlack;
