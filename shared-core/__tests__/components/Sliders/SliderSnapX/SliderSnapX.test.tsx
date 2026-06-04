import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { SliderSnapXProps } from "@shared-core/types/props";

import SliderSnapX from "@shared-core/components/Sliders/SliderSnapX/SliderSnapX";

const renderComponent = (props: Partial<SliderSnapXProps> = {}): RenderResult =>
  render(<SliderSnapX {...props} />);

describe("SliderSnapX", () => {
  describe("rendering", () => {
    it("should render the slider container", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".slider-snap-x")).toBeInTheDocument();
    });

    it("should render its children", () => {
      renderComponent({
        children: (
          <>
            <span>slide one</span>
            <span>slide two</span>
          </>
        ),
      });

      expect(screen.getByText("slide one")).toBeInTheDocument();
      expect(screen.getByText("slide two")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      const { container } = renderComponent({ className: "slider-snap-x--gap" });

      expect(container.querySelector<HTMLDivElement>(".slider-snap-x")).toHaveClass(
        "slider-snap-x--gap"
      );
    });
  });
});
