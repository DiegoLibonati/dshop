import type { JSX } from "react";
import type { SharedComponentModule } from "shared-core/sdk";
import type { ReviewCustomerProps } from "shared-angular/sdk";

import SharedMfe from "@home/components/SharedMfe/SharedMfe";
import CarrouselWithTitleAndArrows from "@home/components/Carrousels/CarrouselWithTitleAndArrows/CarrouselWithTitleAndArrows";

import { useHappyCustomersContext } from "@home/hooks/useHappyCustomersContext";

import "@home/components/Sections/OurHappyCustomersSection/OurHappyCustomersSection.css";

const loadReviewCustomer = (): Promise<SharedComponentModule<ReviewCustomerProps>> =>
  import("shared-angular/sdk").then((m) => m.ReviewCustomerModule);

const OurHappyCustomersSection = (): JSX.Element => {
  const { happyCustomersState } = useHappyCustomersContext();

  return (
    <section className="our-happy-customers">
      <CarrouselWithTitleAndArrows>
        {happyCustomersState.reviews?.map((review) => (
          <SharedMfe
            key={review.id}
            loader={loadReviewCustomer}
            componentProps={{
              name: review.name,
              description: review.description,
              maxStars: 5,
              valueStars: review.value,
              className: "carousel-with-title-and-arrows__item",
            }}
            wrapperClass="carousel-with-title-and-arrows__item-wrapper"
            loadingClass="carousel-with-title-and-arrows__item-loader"
          />
        ))}
      </CarrouselWithTitleAndArrows>
    </section>
  );
};

export default OurHappyCustomersSection;
