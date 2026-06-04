import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { SvgCheckProps } from "@shared-core/types/props";

import SvgCheck from "@shared-core/components/Svgs/SvgCheck/SvgCheck";

const renderComponent = (props: Partial<SvgCheckProps> = {}): RenderResult =>
  render(<SvgCheck {...props} />);

describe("SvgCheck", () => {
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
      expect(svg).toHaveAttribute("viewBox", "0 0 1920 1920");
    });
  });

  describe("props forwarding", () => {
    it("should forward the className to the svg element", () => {
      const { container } = renderComponent({ className: "custom-icon" });

      expect(container.querySelector<SVGSVGElement>("svg")).toHaveClass("custom-icon");
    });

    it("should override the default dimensions with the provided ones", () => {
      const { container } = renderComponent({ width: 48, height: 48 });

      const svg = container.querySelector<SVGSVGElement>("svg");

      expect(svg).toHaveAttribute("width", "48");
      expect(svg).toHaveAttribute("height", "48");
    });
  });
});
