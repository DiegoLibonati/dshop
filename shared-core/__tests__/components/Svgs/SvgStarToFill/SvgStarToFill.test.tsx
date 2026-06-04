import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { SvgStarToFillProps } from "@shared-core/types/props";

import SvgStarToFill from "@shared-core/components/Svgs/SvgStarToFill/SvgStarToFill";

const renderComponent = (props: Partial<SvgStarToFillProps> = {}): RenderResult => {
  const defaultProps: SvgStarToFillProps = {
    outColor: "#FFFFFF",
    inColor: "#FFC633",
    fill: "75",
    ...props,
  };

  return render(<SvgStarToFill {...defaultProps} />);
};

describe("SvgStarToFill", () => {
  describe("rendering", () => {
    it("should render an svg element", () => {
      const { container } = renderComponent();

      expect(container.querySelector<SVGSVGElement>("svg")).toBeInTheDocument();
    });

    it("should render with its default dimensions and viewBox", () => {
      const { container } = renderComponent();

      const svg = container.querySelector<SVGSVGElement>("svg");

      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24");
    });
  });

  describe("gradient", () => {
    it("should render two gradient stops positioned at the fill percentage", () => {
      const { container } = renderComponent({ fill: "75" });

      const stops = container.querySelectorAll<SVGStopElement>("stop");

      expect(stops).toHaveLength(2);
      expect(stops[0]).toHaveAttribute("offset", "75%");
      expect(stops[1]).toHaveAttribute("offset", "75%");
    });

    it("should color the inner stop with inColor and the outer stop with outColor", () => {
      const { container } = renderComponent({ inColor: "#FFC633", outColor: "#FFFFFF" });

      const stops = container.querySelectorAll<SVGStopElement>("stop");

      expect(stops[0]).toHaveAttribute("stop-color", "#FFC633");
      expect(stops[1]).toHaveAttribute("stop-color", "#FFFFFF");
    });
  });

  describe("props forwarding", () => {
    it("should forward the className to the svg element", () => {
      const { container } = renderComponent({ className: "rate-stars__star" });

      expect(container.querySelector<SVGSVGElement>("svg")).toHaveClass("rate-stars__star");
    });

    it("should override the default dimensions with the provided ones", () => {
      const { container } = renderComponent({ width: 48, height: 48 });

      const svg = container.querySelector<SVGSVGElement>("svg");

      expect(svg).toHaveAttribute("width", "48");
      expect(svg).toHaveAttribute("height", "48");
    });
  });
});
