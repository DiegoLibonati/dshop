import { render, screen } from "@testing-library/react";

import { PresentationSection } from "@src/components/composed/Sections/PresentationSection/PresentationSection";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (): RenderComponent => {
  const { container } = render(<PresentationSection />);
  return { container: container };
};

jest.mock("@src/constants/lang", () => ({
  lang: {
    en: {
      presentation: {
        title: "Discover Our Fashion Collection",
        description: "Find your perfect style with our latest arrivals.",
        button_shop_now: "Shop Now",
        international_brands: "International Brands",
        high_quality_products: "High Quality Products",
        happy_customers: "Happy Customers",
      },
    },
  },
}));

describe("PresentationSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the main presentation section.", () => {
      const { container } = renderComponent();

      const section = container.querySelector<HTMLDivElement>(".presentation");

      expect(section).toBeInTheDocument();
    });

    test("It must render the title and description correctly.", () => {
      renderComponent();

      const title = screen.getByRole("heading", {
        name: "Discover Our Fashion Collection",
      });
      const description = screen.getByText(
        "Find your perfect style with our latest arrivals."
      );

      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });

    test("It must render the statistics for brands, products, and customers.", () => {
      renderComponent();

      const brands = screen.getByText("International Brands");
      const products = screen.getByText("High Quality Products");
      const customers = screen.getByText("Happy Customers");

      expect(brands).toBeInTheDocument();
      expect(products).toBeInTheDocument();
      expect(customers).toBeInTheDocument();
    });

    test("It must render both mobile and desktop illustration images.", () => {
      renderComponent();

      const mobileImg = screen.getAllByAltText("presentation-mobile-img")[0];
      const desktopImg = screen.getAllByAltText("presentation-mobile-img")[1];

      expect(mobileImg).toBeInTheDocument();
      expect(desktopImg).toBeInTheDocument();
      expect(mobileImg).toHaveAttribute("src", "test-img");
      expect(desktopImg).toHaveAttribute("src", "test-img");
    });
  });
});
