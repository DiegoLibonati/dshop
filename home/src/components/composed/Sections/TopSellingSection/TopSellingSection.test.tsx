import { render } from "@testing-library/react";

import { TopSellingSection } from "@src/components/composed/Sections/TopSellingSection/TopSellingSection";

import { useConfigContext } from "@src/hooks/useConfigContext";
import { useTopSellingsContext } from "@src/hooks/useTopSellingsContext";

import { Clothes } from "shared_core/SharedCoreEntities";

type RenderComponent = {
  container: HTMLElement;
  props: {
    callbacks: { navigateToProductDetail: jest.Mock };
    topSellings: Clothes[];
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    callbacks: {
      navigateToProductDetail: jest.fn(),
    },
    topSellings: [
      { id: "1", name: "Shoes", price: 120 },
      { id: "2", name: "Jacket", price: 250 },
    ] as Clothes[],
  };

  (useConfigContext as jest.Mock).mockReturnValue({
    callbacks: props.callbacks,
  });
  (useTopSellingsContext as jest.Mock).mockReturnValue({
    topSellings: props.topSellings,
  });

  const { container } = render(<TopSellingSection />);

  return {
    container: container,
    props: props,
  };
};

jest.mock("@src/hooks/useConfigContext", () => ({
  useConfigContext: jest.fn(),
}));

jest.mock("@src/hooks/useTopSellingsContext", () => ({
  useTopSellingsContext: jest.fn(),
}));

jest.mock("@src/constants/lang", () => ({
  lang: {
    en: {
      top_selling: {
        title: "Top Selling",
        button_view_all: "View All",
      },
    },
  },
}));

describe("TopSellingSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the section layout component with correct classes.", () => {
      const { container } = renderComponent();

      const section = container.querySelector<HTMLDivElement>(".top-sellings");

      expect(section).toBeInTheDocument();
    });
  });
});
