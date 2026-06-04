import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { SvgInstagramProps } from "@shared-core/types/props";

import SvgInstagram from "@shared-core/components/Svgs/SvgInstagram/SvgInstagram";

const renderComponent = (props: Partial<SvgInstagramProps> = {}): RenderResult =>
  render(<SvgInstagram {...props} />);

describe("SvgInstagram", () => {
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
      expect(svg).toHaveAttribute("viewBox", "0 0 32 32");
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
