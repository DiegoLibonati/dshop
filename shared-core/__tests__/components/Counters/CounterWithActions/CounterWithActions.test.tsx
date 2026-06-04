import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { CounterWithActionsProps } from "@shared-core/types/props";

import CounterWithActions from "@shared-core/components/Counters/CounterWithActions/CounterWithActions";

const renderComponent = (props: Partial<CounterWithActionsProps> = {}): RenderResult => {
  const defaultProps: CounterWithActionsProps = {
    onChange: jest.fn(),
    ...props,
  };

  return render(<CounterWithActions {...defaultProps} />);
};

describe("CounterWithActions", () => {
  describe("rendering", () => {
    it("should render with an initial count of 1", () => {
      renderComponent();

      expect(screen.getByRole("heading", { name: "1" })).toBeInTheDocument();
    });

    it("should render the minus and plus action buttons", () => {
      renderComponent();

      expect(screen.getByRole("button", { name: "action minus" })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: "action plus" })).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      const { container } = renderComponent({ className: "counter--inline" });

      expect(container.querySelector<HTMLDivElement>(".counter-with-actions")).toHaveClass(
        "counter--inline"
      );
    });
  });

  describe("behavior", () => {
    it("should call onChange with the initial count on mount", () => {
      const mockOnChange = jest.fn();
      renderComponent({ onChange: mockOnChange });

      expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it("should increment the count when the plus action is clicked", async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();
      renderComponent({ onChange: mockOnChange });

      await user.click(screen.getByRole("button", { name: "action plus" }));

      expect(screen.getByRole("heading", { name: "2" })).toBeInTheDocument();
      expect(mockOnChange).toHaveBeenLastCalledWith(2);
    });

    it("should not decrement the count below 1", async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.click(screen.getByRole("button", { name: "action minus" }));

      expect(screen.getByRole("heading", { name: "1" })).toBeInTheDocument();
    });

    it("should decrement the count after it has been incremented", async () => {
      const user = userEvent.setup();
      renderComponent();

      await user.click(screen.getByRole("button", { name: "action plus" }));
      await user.click(screen.getByRole("button", { name: "action plus" }));
      await user.click(screen.getByRole("button", { name: "action minus" }));

      expect(screen.getByRole("heading", { name: "2" })).toBeInTheDocument();
    });

    it("should not increment past the provided limit", async () => {
      const user = userEvent.setup();
      const mockOnChange = jest.fn();
      renderComponent({ limit: 2, onChange: mockOnChange });

      await user.click(screen.getByRole("button", { name: "action plus" }));
      await user.click(screen.getByRole("button", { name: "action plus" }));
      await user.click(screen.getByRole("button", { name: "action plus" }));

      expect(screen.getByRole("heading", { name: "2" })).toBeInTheDocument();
      expect(mockOnChange).toHaveBeenLastCalledWith(2);
    });
  });
});
