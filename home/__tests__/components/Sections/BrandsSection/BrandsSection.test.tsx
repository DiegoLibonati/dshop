import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { Brand } from "@home/types/app";
import type { BrandsContext as BrandsContextValue } from "@home/types/contexts";

import BrandsSection from "@home/components/Sections/BrandsSection/BrandsSection";

import { BrandsContext } from "@home/contexts/BrandsContext/BrandsContext";

import { mockBrands } from "@tests/__mocks__/brands.mock";

const mockHandleSetBrands = jest.fn();

const renderComponent = (brands: Brand[] | null = mockBrands): RenderResult => {
  const value: BrandsContextValue = {
    brandsState: { brands },
    handleSetBrands: mockHandleSetBrands,
  };

  return render(
    <BrandsContext.Provider value={value}>
      <BrandsSection />
    </BrandsContext.Provider>
  );
};

describe("BrandsSection", () => {
  describe("rendering", () => {
    it("should render a heading for each brand in the context", () => {
      renderComponent();

      mockBrands.forEach((brand) => {
        expect(screen.getByRole("heading", { level: 2, name: brand })).toBeInTheDocument();
      });
    });

    it("should render one brand article per brand", () => {
      const { container } = renderComponent();

      expect(container.querySelectorAll<HTMLElement>(".brands-brand")).toHaveLength(
        mockBrands.length
      );
    });
  });

  describe("edge cases", () => {
    it("should render no brand articles when the brands list is empty", () => {
      const { container } = renderComponent([]);

      expect(container.querySelectorAll<HTMLElement>(".brands-brand")).toHaveLength(0);
    });

    it("should render no brand articles when the brands are not set", () => {
      const { container } = renderComponent(null);

      expect(container.querySelectorAll<HTMLElement>(".brands-brand")).toHaveLength(0);
    });
  });
});
