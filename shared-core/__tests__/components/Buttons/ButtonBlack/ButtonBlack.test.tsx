import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ButtonBlackProps } from "@shared-core/types/props";

import ButtonBlack from "@shared-core/components/Buttons/ButtonBlack/ButtonBlack";

const renderComponent = (props: Partial<ButtonBlackProps> = {}): RenderResult => {
  const defaultProps: ButtonBlackProps = {
    ariaLabel: "black button",
    children: "Click",
    ...props,
  };

  return render(<ButtonBlack {...defaultProps} />);
};

describe("ButtonBlack", () => {
  describe("rendering", () => {
    it("should render a button with the aria label as its accessible name", () => {
      renderComponent({ ariaLabel: "add to cart" });

      expect(screen.getByRole("button", { name: "add to cart" })).toBeInTheDocument();
    });

    it("should render with the type button", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveAttribute("type", "button");
    });

    it("should render with the base button-black class", () => {
      renderComponent();

      expect(screen.getByRole("button")).toHaveClass("button-black");
    });

    it("should render its children", () => {
      renderComponent({ children: "Buy now" });

      expect(screen.getByRole("button")).toHaveTextContent("Buy now");
    });

    it("should apply the rounded modifier when rounded is true", () => {
      renderComponent({ rounded: true });

      expect(screen.getByRole("button")).toHaveClass("button-black--rounded");
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
