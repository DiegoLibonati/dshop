import { render, screen } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { MenuScreenWhiteProps } from "@shared-core/types/props";

import MenuScreenWhite from "@shared-core/components/Menus/MenuScreenWhite/MenuScreenWhite";

const renderComponent = (props: Partial<MenuScreenWhiteProps> = {}): RenderResult =>
  render(<MenuScreenWhite {...props} />);

describe("MenuScreenWhite", () => {
  describe("rendering", () => {
    it("should render the menu container", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".menu-screen-white")).toBeInTheDocument();
    });

    it("should render its children", () => {
      renderComponent({ children: <span>menu content</span> });

      expect(screen.getByText("menu content")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      const { container } = renderComponent({ className: "menu-screen-white--no-fixed" });

      expect(container.querySelector<HTMLDivElement>(".menu-screen-white")).toHaveClass(
        "menu-screen-white--no-fixed"
      );
    });
  });
});
