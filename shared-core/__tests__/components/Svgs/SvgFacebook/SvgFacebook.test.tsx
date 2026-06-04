import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { SvgFacebookProps } from "@shared-core/types/props";

import SvgFacebook from "@shared-core/components/Svgs/SvgFacebook/SvgFacebook";

const renderComponent = (props: Partial<SvgFacebookProps> = {}): RenderResult =>
  render(<SvgFacebook {...props} />);

describe("SvgFacebook", () => {
  describe("rendering", () => {
    it("should render an svg element", () => {
      const { container } = renderComponent();

      expect(container.querySelector<SVGSVGElement>("svg")).toBeInTheDocument();
    });

    it("should render with its default dimensions and viewBox", () => {
      const { container } = renderComponent();

      const svg = container.querySelector<SVGSVGElement>("svg");

      expect(svg).toHaveAttribute("width", "8");
      expect(svg).toHaveAttribute("height", "13");
      expect(svg).toHaveAttribute("viewBox", "0 0 8 13");
    });
  });

  describe("props forwarding", () => {
    it("should forward the className to the svg element", () => {
      const { container } = renderComponent({ className: "custom-icon" });

      expect(container.querySelector<SVGSVGElement>("svg")).toHaveClass("custom-icon");
    });

    it("should override the default dimensions with the provided ones", () => {
      const { container } = renderComponent({ width: 24, height: 24 });

      const svg = container.querySelector<SVGSVGElement>("svg");

      expect(svg).toHaveAttribute("width", "24");
      expect(svg).toHaveAttribute("height", "24");
    });
  });
});
