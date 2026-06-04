import type { JSX } from "react";
import type { RateStarsProps } from "@shared-core/types/props";

import SvgStarToFill from "@shared-core/components/Svgs/SvgStarToFill/SvgStarToFill";

import "@shared-core/components/Ratings/RateStars/RateStars.css";

const RateStars = ({
  max,
  value,
  inColor,
  outColor,
  className,
  classNameStar,
}: RateStarsProps): JSX.Element => {
  return (
    <div className={`rate-stars ${className}`}>
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;
        const fillPercentage = Math.min(Math.max(value - (starValue - 1), 0), 1) * 100;

        return (
          <SvgStarToFill
            key={`star_${i}_ratestars`}
            className={`rate-stars__star ${classNameStar}`}
            fill={String(fillPercentage)}
            inColor={inColor}
            outColor={outColor}
          ></SvgStarToFill>
        );
      })}
    </div>
  );
};

export default RateStars;
