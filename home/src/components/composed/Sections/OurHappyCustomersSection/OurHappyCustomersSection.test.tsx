import { render } from "@testing-library/react";

import { OurHappyCustomersSection } from "@src/components/composed/Sections/OurHappyCustomersSection/OurHappyCustomersSection";

import { useHappyCustomersContext } from "@src/hooks/useHappyCustomersContext";

import { Review } from "shared_core/SharedCoreEntities";

type RenderComponent = {
  container: HTMLElement;
  props: {
    reviews: Review[];
  };
};

const renderComponent = (): RenderComponent => {
  const props = {
    reviews: [
      { id: "1", name: "Alice", description: "Excellent product!", value: 5 },
      { id: "2", name: "Bob", description: "Good service.", value: 4 },
    ],
  };

  (useHappyCustomersContext as jest.Mock).mockReturnValue({
    reviews: props.reviews,
  });

  const { container } = render(<OurHappyCustomersSection />);

  return {
    container: container,
    props: props,
  };
};

jest.mock("@src/hooks/useHappyCustomersContext", () => ({
  useHappyCustomersContext: jest.fn(),
}));

describe("OurHappyCustomersSection.tsx", () => {
  describe("General Tests.", () => {
    test("It must render the section container.", () => {
      const { container } = renderComponent();

      const section = container.querySelector<HTMLDivElement>(
        ".our-happy-customers"
      );

      expect(section).toBeInTheDocument();
    });

    test("It must render the carrousel component.", () => {
      const { container } = renderComponent();

      const carrousel = container.querySelector<HTMLDivElement>(
        ".carousel-with-title-and-arrows"
      );

      expect(carrousel).toBeInTheDocument();
    });
  });
});
