import type { JSX } from "react";
import type { ImageWithBackgroundColorProps } from "@shared-core/types/props";

import "@shared-core/components/Images/ImageWithBackgroundColor/ImageWithBackgroundColor.css";

const ImageWithBackgroundColor = ({
  src,
  alt,
  bgColor,
  isActive,
  className,
  onClick,
}: ImageWithBackgroundColorProps): JSX.Element => {
  return (
    <div
      className={`image-with-background-color-wrapper ${
        onClick && "image-with-background-color-wrapper--pointer"
      } ${isActive && "image-with-background-color-wrapper--active"} ${className}`}
      style={{ backgroundColor: bgColor }}
      onClick={onClick}
    >
      <img src={src} alt={alt} className="image-with-background-color__img"></img>
    </div>
  );
};

export default ImageWithBackgroundColor;
