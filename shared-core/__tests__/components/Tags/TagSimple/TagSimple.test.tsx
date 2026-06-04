import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { TagSimpleProps } from "@shared-core/types/props";

import TagSimple from "@shared-core/components/Tags/TagSimple/TagSimple";

const renderComponent = (props: Partial<TagSimpleProps> = {}): RenderResult =>
  render(<TagSimple {...props} />);

describe("TagSimple", () => {
  describe("rendering", () => {
    it("should render the tag container", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".tag-simple")).toBeInTheDocument();
    });

    it("should render its children inside a heading", () => {
      renderComponent({ children: "Large" });

      expect(screen.getByRole("heading", { name: "Large" })).toBeInTheDocument();
    });

    it("should not render a heading when there are no children", () => {
      renderComponent();

      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("should apply the pointer modifier when onClick is provided", () => {
      const { container } = renderComponent({ onClick: jest.fn() });

      expect(container.querySelector<HTMLDivElement>(".tag-simple")).toHaveClass(
        "tag-simple--pointer"
      );
    });

    it("should not apply the pointer modifier when onClick is omitted", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".tag-simple")).not.toHaveClass(
        "tag-simple--pointer"
      );
    });

    it("should apply the provided className", () => {
      const { container } = renderComponent({ className: "tag-simple--large" });

      expect(container.querySelector<HTMLDivElement>(".tag-simple")).toHaveClass(
        "tag-simple--large"
      );
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      const { container } = renderComponent({ onClick: mockOnClick });

      await user.click(container.querySelector<HTMLDivElement>(".tag-simple")!);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
