import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { AnchorCircularProps } from "@shared-core/types/props";

import AnchorCircular from "@shared-core/components/Anchors/AnchorCircular/AnchorCircular";

const renderComponent = (props: Partial<AnchorCircularProps> = {}): RenderResult => {
  const defaultProps: AnchorCircularProps = {
    ariaLabel: "social media link",
    href: "https://example.com",
    ...props,
  };

  return render(<AnchorCircular {...defaultProps} />);
};

describe("AnchorCircular", () => {
  describe("rendering", () => {
    it("should render an anchor with the aria label as its accessible name", () => {
      renderComponent({ ariaLabel: "go to instagram" });

      expect(screen.getByRole("link", { name: "go to instagram" })).toBeInTheDocument();
    });

    it("should render with the base anchor-circular class", () => {
      renderComponent();

      expect(screen.getByRole("link")).toHaveClass("anchor-circular");
    });

    it("should set the provided href", () => {
      renderComponent({ href: "https://shop.example.com" });

      expect(screen.getByRole("link")).toHaveAttribute("href", "https://shop.example.com");
    });

    it("should render its children", () => {
      renderComponent({ children: <span>icon</span> });

      expect(screen.getByText("icon")).toBeInTheDocument();
    });
  });

  describe("target", () => {
    it("should open in a new tab by default", () => {
      renderComponent();

      expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
    });

    it("should use the provided target", () => {
      renderComponent({ target: "_self" });

      expect(screen.getByRole("link")).toHaveAttribute("target", "_self");
    });
  });

  describe("modifiers", () => {
    it("should apply the border-gray modifier when borderGray is true", () => {
      renderComponent({ borderGray: true });

      expect(screen.getByRole("link")).toHaveClass("anchor-circular--border-gray");
    });
  });
});
