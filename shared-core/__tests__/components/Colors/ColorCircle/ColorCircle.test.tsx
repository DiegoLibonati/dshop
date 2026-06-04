import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ColorCircleProps } from "@shared-core/types/props";

import ColorCircle from "@shared-core/components/Colors/ColorCircle/ColorCircle";

const renderComponent = (props: Partial<ColorCircleProps> = {}): RenderResult => {
  const defaultProps: ColorCircleProps = {
    color: "#0099ff",
    ...props,
  };

  return render(<ColorCircle {...defaultProps} />);
};

describe("ColorCircle", () => {
  describe("rendering", () => {
    it("should render the circle with the provided background color", () => {
      const { container } = renderComponent({ color: "#0099ff" });

      const circle = container.querySelector<HTMLDivElement>(".color-circle");

      expect(circle).toBeInTheDocument();
      expect(circle).toHaveStyle({ backgroundColor: "#0099ff" });
    });

    it("should render the check icon when active", () => {
      const { container } = renderComponent({ isActive: true });

      expect(container.querySelector<SVGSVGElement>(".color-circle__check")).toBeInTheDocument();
    });

    it("should not render the check icon when not active", () => {
      const { container } = renderComponent({ isActive: false });

      expect(
        container.querySelector<SVGSVGElement>(".color-circle__check")
      ).not.toBeInTheDocument();
    });

    it("should apply the pointer modifier when onClick is provided", () => {
      const { container } = renderComponent({ onClick: jest.fn() });

      expect(container.querySelector<HTMLDivElement>(".color-circle")).toHaveClass(
        "color-circle--pointer"
      );
    });

    it("should not apply the pointer modifier when onClick is omitted", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".color-circle")).not.toHaveClass(
        "color-circle--pointer"
      );
    });
  });

  describe("behavior", () => {
    it("should call onClick when clicked", async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      const { container } = renderComponent({ onClick: mockOnClick });

      await user.click(container.querySelector<HTMLDivElement>(".color-circle")!);

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
