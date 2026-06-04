import type { JSX } from "react";
import type { ButtonWhiteProps } from "@shared-core/types/props";

import "@shared-core/components/Buttons/ButtonWhite/ButtonWhite.css";

const ButtonWhite = ({
  ariaLabel,
  borderGray,
  rounded,
  type,
  children,
  className,
  onClick,
}: ButtonWhiteProps): JSX.Element => {
  return (
    <button
      type={type ?? "button"}
      className={`button-white ${rounded && "button-white--rounded"} ${
        borderGray && "button-white--border-gray"
      } ${className}`}
      aria-label={ariaLabel}
      onClick={onClick ?? undefined}
    >
      {children}
    </button>
  );
};

export default ButtonWhite;
