import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { DressStyle } from "@home/types/app";
import type { IllustrationWithTitleProps } from "@home/types/props";

import IllustrationWithTitle from "@home/components/Illustrations/IllustrationWithTitle/IllustrationWithTitle";

const mockOnClick = jest.fn();

const renderComponent = (props: Partial<IllustrationWithTitleProps> = {}): RenderResult => {
  const defaultProps: IllustrationWithTitleProps = {
    type: "casual",
    onClick: mockOnClick,
    ...props,
  };

  return render(<IllustrationWithTitle {...defaultProps} />);
};

describe("IllustrationWithTitle", () => {
  describe("rendering", () => {
    it("should render an accessible button labelled with the style type", () => {
      renderComponent({ type: "formal" });

      expect(screen.getByRole("button", { name: "illustration formal" })).toBeInTheDocument();
    });

    it("should render the style type as the heading", () => {
      renderComponent({ type: "gym" });

      expect(screen.getByRole("heading", { level: 2, name: "gym" })).toBeInTheDocument();
    });

    it.each<[DressStyle, string]>([
      ["casual", "illustration-with-title__illustration-casual"],
      ["formal", "illustration-with-title__illustration-formal"],
      ["gym", "illustration-with-title__illustration-gym"],
      ["party", "illustration-with-title__illustration-party"],
    ])("should render the %s illustration image with its modifier class", (type, expectedClass) => {
      renderComponent({ type });

      expect(screen.getByRole("img", { name: `${type} img` })).toHaveClass(expectedClass);
    });

    it("should render a single illustration image for the given type", () => {
      renderComponent({ type: "party" });

      expect(screen.getAllByRole("img")).toHaveLength(1);
    });

    it("should append the provided className to the button", () => {
      renderComponent({ className: "custom-illustration" });

      expect(screen.getByRole("button", { name: "illustration casual" })).toHaveClass(
        "illustration-with-title",
        "custom-illustration"
      );
    });
  });

  describe("behavior", () => {
    it("should call onClick when the illustration is clicked", async () => {
      const user = userEvent.setup();
      renderComponent({ type: "casual" });

      await user.click(screen.getByRole("button", { name: "illustration casual" }));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
