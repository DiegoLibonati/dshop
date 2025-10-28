import React, { useEffect, useState } from "react";

import ReviewCustomer from "@src/components/core/Reviews/ReviewCustomer/ReviewCustomer";
import { CarrouselWithTitleAndArrows } from "@src/components/composed/Carrousels/CarrouselWithTitleAndArrows/CarrouselWithTitleAndArrows";

import { useHappyCustomersContext } from "@src/hooks/useHappyCustomersContext";

import { getIdsByLength } from "shared_core/SharedCore";

import "@src/components/composed/Sections/OurHappyCustomersSection/OurHappyCustomersSection.css";

export const OurHappyCustomersSection = () => {
  const [idsReviews, setIdsReviews] = useState<string[]>([]);

  const { reviews } = useHappyCustomersContext();

  const clearIdsRoot = () => {
    setIdsReviews([]);
  };

  const onReviewsChange = () => {
    if (reviews?.length === 0 || !reviews) return;

    if (idsReviews.length > 0) {
      clearIdsRoot();
    }

    setIdsReviews(getIdsByLength(reviews!.length));
  };

  useEffect(onReviewsChange, [reviews]);

  return (
    <section className="our-happy-customers">
      <CarrouselWithTitleAndArrows>
        {idsReviews.length > 0 &&
          reviews!.map((r, i) => {
            return (
              <ReviewCustomer
                key={r.id}
                idRoot={idsReviews[i]}
                name={r.name}
                description={r.description}
                maxStars={5}
                valueStars={r.value}
                className="carousel-with-title-and-arrows__item"
                classNameWrapper="carousel-with-title-and-arrows__item-wrapper"
              ></ReviewCustomer>
            );
          })}
      </CarrouselWithTitleAndArrows>
    </section>
  );
};
