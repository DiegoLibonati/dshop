import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { InformationItemClothesProps } from "@shared-core/types/props";

import InformationItemClothes from "@shared-core/components/Informations/InformationItemClothes/InformationItemClothes";

const renderComponent = (props: Partial<InformationItemClothesProps> = {}): RenderResult => {
  const defaultProps: InformationItemClothesProps = {
    name: "Casual White T-Shirt",
    rate: 4,
    price: 200,
    discount: 10,
    ...props,
  };

  return render(<InformationItemClothes {...defaultProps} />);
};

describe("InformationItemClothes", () => {
  describe("rendering", () => {
    it("should render the name as a heading", () => {
      renderComponent({ name: "Blue Denim Jacket" });

      expect(screen.getByRole("heading", { name: "Blue Denim Jacket" })).toBeInTheDocument();
    });

    it("should render the rate over the maximum stars", () => {
      renderComponent({ rate: 4 });

      expect(screen.getByText("4/5")).toBeInTheDocument();
    });

    it("should render the description when provided", () => {
      renderComponent({ description: "Soft breathable cotton tee." });

      expect(screen.getByText("Soft breathable cotton tee.")).toBeInTheDocument();
    });

    it("should not render a description when it is omitted", () => {
      const { container } = renderComponent();

      expect(
        container.querySelector<HTMLParagraphElement>(".information-item-clothes__description")
      ).not.toBeInTheDocument();
    });
  });

  describe("price", () => {
    it("should render the discounted final price", () => {
      renderComponent({ price: 200, discount: 10 });

      expect(screen.getByText("$180")).toBeInTheDocument();
    });

    it("should render the original price and the discount when there is a discount", () => {
      renderComponent({ price: 200, discount: 10 });

      expect(screen.getByText("$200")).toBeInTheDocument();
      expect(screen.getByText("-10%")).toBeInTheDocument();
    });

    it("should render only the price and no discount when the discount is zero", () => {
      renderComponent({ price: 200, discount: 0 });

      expect(screen.getByText("$200")).toBeInTheDocument();
      expect(screen.queryByText("-0%")).not.toBeInTheDocument();
    });
  });
});
