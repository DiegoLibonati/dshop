import { lazy, useRef } from "react";

import type { JSX } from "react";
import type { CarrouselWithTitleAndArrowsProps } from "@home/types/props";

import SharedMfe from "@home/components/SharedMfe/SharedMfe";

import { lang } from "@home/constants/lang";

import "@home/components/Carrousels/CarrouselWithTitleAndArrows/CarrouselWithTitleAndArrows.css";

const SvgArrowLeft = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.SvgArrowLeft }))
);
const SvgArrowRight = lazy(() =>
  import("shared-core/sdk").then((m) => ({ default: m.SvgArrowRight }))
);

const CarrouselWithTitleAndArrows = ({
  children,
}: CarrouselWithTitleAndArrowsProps): JSX.Element => {
  const refContent = useRef<HTMLDivElement | null>(null);

  const handleClickLeft = (): void => {
    refContent.current!.scrollBy({ left: -refContent.current!.offsetWidth, behavior: "smooth" });
  };

  const handleClickRight = (): void => {
    refContent.current!.scrollBy({ left: refContent.current!.offsetWidth, behavior: "smooth" });
  };

  return (
    <div className="carousel-with-title-and-arrows">
      <div className="carousel-with-title-and-arrows__header">
        <h2 className="carousel-with-title-and-arrows__header-title">
          {lang.en.ourHappyCustomers.title}
        </h2>

        <div className="carousel-with-title-and-arrows__header-actions">
          <button
            type="button"
            aria-label="prev item"
            className="carousel-with-title-and-arrows__header-arrow"
            onClick={handleClickLeft}
          >
            <SharedMfe
              component={SvgArrowLeft}
              componentProps={{ width: 24, height: 24 }}
              wrapperClass="carousel-with-title-and-arrows__header-arrow-icon-wrapper"
              loadingClass="carousel-with-title-and-arrows__header-arrow-loader"
            />
          </button>
          <button
            type="button"
            aria-label="next item"
            className="carousel-with-title-and-arrows__header-arrow"
            onClick={handleClickRight}
          >
            <SharedMfe
              component={SvgArrowRight}
              componentProps={{ width: 24, height: 24 }}
              wrapperClass="carousel-with-title-and-arrows__header-arrow-icon-wrapper"
              loadingClass="carousel-with-title-and-arrows__header-arrow-loader"
            />
          </button>
        </div>
      </div>

      <div className="carousel-with-title-and-arrows__content" ref={refContent}>
        {children}
      </div>
    </div>
  );
};

export default CarrouselWithTitleAndArrows;
