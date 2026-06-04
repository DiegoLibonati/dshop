import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { FormSearchProps } from "@shared-core/types/props";

import FormSearch from "@shared-core/components/Forms/FormSearch/FormSearch";

const renderComponent = (props: Partial<FormSearchProps> = {}): RenderResult => {
  const defaultProps: FormSearchProps = {
    onSubmit: jest.fn(),
    ...props,
  };

  return render(<FormSearch {...defaultProps} />);
};

describe("FormSearch", () => {
  describe("rendering", () => {
    it("should render the search input", () => {
      renderComponent();

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should render the input with the provided placeholder", () => {
      renderComponent({ placeholder: "Search for products..." });

      expect(screen.getByRole("textbox")).toHaveAttribute("placeholder", "Search for products...");
    });

    it("should render the submit button", () => {
      renderComponent();

      expect(screen.getByRole("button", { name: "form search submit" })).toBeInTheDocument();
    });
  });

  describe("behavior", () => {
    it("should update the input value as the user types", async () => {
      const user = userEvent.setup();
      renderComponent();

      const input = screen.getByRole("textbox");
      await user.type(input, "shoes");

      expect(input).toHaveValue("shoes");
    });

    it("should call onSubmit with the input value when submitted", async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      renderComponent({ onSubmit: mockOnSubmit });

      await user.type(screen.getByRole("textbox"), "jacket");
      await user.click(screen.getByRole("button", { name: "form search submit" }));

      expect(mockOnSubmit).toHaveBeenCalledWith("jacket");
    });

    it("should call onSubmit with an empty string when submitted without typing", async () => {
      const user = userEvent.setup();
      const mockOnSubmit = jest.fn();
      renderComponent({ onSubmit: mockOnSubmit });

      await user.click(screen.getByRole("button", { name: "form search submit" }));

      expect(mockOnSubmit).toHaveBeenCalledWith("");
    });
  });
});
