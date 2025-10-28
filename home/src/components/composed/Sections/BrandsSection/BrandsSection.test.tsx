import { render, screen } from "@testing-library/react";

import { BrandsSection } from "@src/components/composed/Sections/BrandsSection/BrandsSection";

import { useBrandsContext } from "@src/hooks/useBrandsContext";

type RenderComponent = {
  container: HTMLElement;
};

const renderComponent = (brands: string[]): RenderComponent => {
  (useBrandsContext as jest.Mock).mockReturnValue({ brands });

  const { container } = render(<BrandsSection />);

  return {
    container: container,
  };
};

jest.mock("@src/hooks/useBrandsContext", () => ({
  useBrandsContext: jest.fn(),
}));

describe("BrandsSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the component.", () => {
      const { container } = renderComponent(["Nike"]);

      const section = container.querySelector<HTMLDivElement>(".brands");

      expect(section).toBeInTheDocument();
    });

    test("It must render all brand elements.", () => {
      const brands = ["Nike", "Adidas", "Puma"];
      renderComponent(brands);

      brands.forEach((brand) => {
        const brandElement = screen.getByRole("heading", { name: brand });
        expect(brandElement).toBeInTheDocument();
      });
    });
  });

  describe("Behavior with empty brands.", () => {
    test("It must render an empty section when there are no brands.", () => {
      const { container } = renderComponent([]);

      const section = container.querySelector<HTMLDivElement>(".brands");
      const brandItems = container.querySelectorAll(".brands-brand");

      expect(section).toBeInTheDocument();
      expect(brandItems.length).toBe(0);
    });
  });
});
