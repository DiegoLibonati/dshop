import type { JSX } from "react";
import type { ColorCircleProps } from "@shared-core/types/props";

import SvgCheck from "@shared-core/components/Svgs/SvgCheck/SvgCheck";

import "@shared-core/components/Colors/ColorCircle/ColorCircle.css";

const ColorCircle = ({ className, isActive, color, onClick }: ColorCircleProps): JSX.Element => {
  return (
    <div
      className={`color-circle ${onClick && "color-circle--pointer"} ${className}`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {isActive && <SvgCheck className="color-circle__check"></SvgCheck>}
    </div>
  );
};

export default ColorCircle;
