import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ButtonWhiteProps } from "@shared-core/types/props";

import ButtonWhite from "@shared-core/components/Buttons/ButtonWhite/ButtonWhite";

const renderComponent = (props: Partial<ButtonWhiteProps> = {}): RenderResult => {
  const defaultProps: ButtonWhiteProps = {
    ariaLabel: "white button",
    children: "Click",
    ...props,
  };

  return render(<ButtonWhite {...defaultProps} />);
};

describe("ButtonWhite", () => {
  describe("rendering", () => {
    it("should render a button with the aria label as its accessible name", () => {
      renderComponent({ ariaLabel: "add to wishlist" });

      expect(screen.getByRole("button", { name: "add to wishlist" })).toBeInTheDocument();
    });

    it("should render with the type button by default", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should render with the provided type", () => {
      renderComponent({ type: "submit" });

      expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
    });

    it("should render with the base button-white class", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveClass("button-white");
    });

    it("should render its children", () => {
      renderComponent({ children: "Continue" });

      expect(screen.getByRole("button")).toHaveTextContent("Continue");
    });

    it("should apply the rounded modifier when rounded is true", () => {
      renderComponent({ rounded: true });

      expect(screen.getByRole("button")).toHaveClass("button-white--rounded");
    });

    it("should apply the border-gray modifier when borderGray is true", () => {
      renderComponent({ borderGray: true });

      expect(screen.getByRole("button")).toHaveClass("button-white--border-gray");
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      renderComponent({ onClick: mockOnClick });

      await user.click(screen.getByRole("button"));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
