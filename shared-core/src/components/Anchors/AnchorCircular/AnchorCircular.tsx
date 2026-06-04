import type { JSX } from "react";
import type { AnchorCircularProps } from "@shared-core/types/props";

import "@shared-core/components/Anchors/AnchorCircular/AnchorCircular.css";

const AnchorCircular = ({
  ariaLabel,
  borderGray,
  href,
  target,
  className,
  children,
}: AnchorCircularProps): JSX.Element => {
  return (
    <a
      className={`anchor-circular ${borderGray && "anchor-circular--border-gray"} ${className}`}
      aria-label={ariaLabel}
      href={href}
      target={target ?? "_blank"}
    >
      {children}
    </a>
  );
};

export default AnchorCircular;
