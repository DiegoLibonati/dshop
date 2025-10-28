import { render } from "@testing-library/react";

import { NewArrivalsSection } from "@src/components/composed/Sections/NewArrivalsSection/NewArrivalsSection";

import { useConfigContext } from "@src/hooks/useConfigContext";
import { useNewArrivalsContext } from "@src/hooks/useNewArrivalsContext";

import { Clothes } from "shared_core/SharedCoreEntities";

type RenderComponent = {
  container: HTMLElement;
  props: {
    callbacks: { navigateToProductDetail: jest.Mock };
    newArrivals: Clothes[];
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    callbacks: {
      navigateToProductDetail: jest.fn(),
    },
    newArrivals: [
      { id: "1", name: "Shirt", price: 50 },
      { id: "2", name: "Pants", price: 80 },
    ] as Clothes[],
  };

  (useConfigContext as jest.Mock).mockReturnValue({
    callbacks: props.callbacks,
  });
  (useNewArrivalsContext as jest.Mock).mockReturnValue({
    newArrivals: props.newArrivals,
  });

  const { container } = render(<NewArrivalsSection />);

  return {
    container: container,
    props: props,
  };
};

jest.mock("@src/hooks/useConfigContext", () => ({
  useConfigContext: jest.fn(),
}));

jest.mock("@src/hooks/useNewArrivalsContext", () => ({
  useNewArrivalsContext: jest.fn(),
}));

jest.mock("@src/constants/lang", () => ({
  lang: {
    en: {
      new_arrivals: {
        title: "New Arrivals",
        button_view_all: "View All",
      },
    },
  },
}));

describe("NewArrivalsSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the section layout component with correct classes.", () => {
      const { container } = renderComponent();

      const section = container.querySelector<HTMLDivElement>(".new-arrivals");

      expect(section).toBeInTheDocument();
    });
  });
});
