import type { JSX } from "react";
import type { SliderSnapXProps } from "@shared-core/types/props";

import "@shared-core/components/Sliders/SliderSnapX/SliderSnapX.css";

const SliderSnapX = ({ children, className }: SliderSnapXProps): JSX.Element => {
  return <div className={`slider-snap-x ${className}`}>{children}</div>;
};

export default SliderSnapX;
