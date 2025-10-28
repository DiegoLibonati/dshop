import { render, screen } from "@testing-library/angular";

import { ReviewCustomerProps } from "@src/app/entities/props";

import { ReviewCustomerComponent } from "@src/app/components/composed/reviews/review-customer/review-customer.component";
import { RateStarsComponent } from "@src/app/components/core/ratings/rate-stars/rate-stars.component";

type RenderComponent = {
  props: ReviewCustomerProps;
  container: Element;
};

const renderComponent = async (): Promise<RenderComponent> => {
  const props: ReviewCustomerProps = {
    name: "namecito",
    description: "description",
    maxStars: 5,
    valueStars: 2,
    className: "test class",
  };

  const { container } = await render(ReviewCustomerComponent, {
    componentProperties: props,
    declarations: [RateStarsComponent],
  });

  return {
    props: props,
    container: container,
  };
};

describe("review-customer.component.ts", () => {
  describe("General Tests.", () => {
    test("It must render the customer review.", async () => {
      const { container } = await renderComponent();

      const review =
        container.querySelector<HTMLDivElement>(".review-customer");

      expect(review).toBeInTheDocument();
    });

    test("It must render the stars with their maximum and current values.", async () => {
      const { container, props } = await renderComponent();

      const rateStars = container.querySelector<HTMLElement>("app-rate-stars");

      expect(rateStars).toBeInTheDocument();
      expect(rateStars!.getAttribute("ng-reflect-max")).toBe(
        props.maxStars.toString()
      );
      expect(rateStars!.getAttribute("ng-reflect-value")).toBe(
        props.valueStars.toString()
      );
    });

    test("It must render the name and description of the review.", async () => {
      const { props } = await renderComponent();

      const name = screen.getByRole("heading", { name: props.name });
      const description = screen.getByText(props.description);

      expect(name).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });
});
