import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { RateStarsProps } from "@shared-core/types/props";

import RateStars from "@shared-core/components/Ratings/RateStars/RateStars";

const renderComponent = (props: Partial<RateStarsProps> = {}): RenderResult => {
  const defaultProps: RateStarsProps = {
    max: 5,
    value: 4,
    inColor: "#FFC633",
    outColor: "#FFFFFF",
    ...props,
  };

  return render(<RateStars {...defaultProps} />);
};

describe("RateStars", () => {
  describe("rendering", () => {
    it("should render the rate-stars container", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".rate-stars")).toBeInTheDocument();
    });

    it.each<[number]>([[1], [3], [5], [10]])(
      "should render %d stars when max is %d",
      (max: number) => {
        const { container } = renderComponent({ max });

        expect(container.querySelectorAll<SVGSVGElement>(".rate-stars__star")).toHaveLength(max);
      }
    );

    it("should apply the provided className to the container", () => {
      const { container } = renderComponent({ className: "rate-stars--compact" });

      expect(container.querySelector<HTMLDivElement>(".rate-stars")).toHaveClass(
        "rate-stars--compact"
      );
    });

    it("should apply the provided star className to every star", () => {
      const { container } = renderComponent({ max: 5, classNameStar: "rate-stars__star--small" });

      expect(container.querySelectorAll<SVGSVGElement>(".rate-stars__star--small")).toHaveLength(5);
    });
  });
});
