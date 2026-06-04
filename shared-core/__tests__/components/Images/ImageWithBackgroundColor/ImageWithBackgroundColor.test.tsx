import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { RenderResult } from "@testing-library/react";
import type { ImageWithBackgroundColorProps } from "@shared-core/types/props";

import ImageWithBackgroundColor from "@shared-core/components/Images/ImageWithBackgroundColor/ImageWithBackgroundColor";

const renderComponent = (props: Partial<ImageWithBackgroundColorProps> = {}): RenderResult => {
  const defaultProps: ImageWithBackgroundColorProps = {
    src: "https://example.com/shirt.png",
    alt: "White T-Shirt",
    bgColor: "#0099ff",
    isActive: false,
    ...props,
  };

  return render(<ImageWithBackgroundColor {...defaultProps} />);
};

const getWrapper = (container: HTMLElement): HTMLDivElement =>
  container.querySelector<HTMLDivElement>(".image-with-background-color-wrapper")!;

describe("ImageWithBackgroundColor", () => {
  describe("rendering", () => {
    it("should render the image using the alt text and src", () => {
      renderComponent({ alt: "Blue Jacket", src: "https://example.com/jacket.png" });

      const image = screen.getByRole("img", { name: "Blue Jacket" });

      expect(image).toHaveAttribute("src", "https://example.com/jacket.png");
    });

    it("should apply the background color to the wrapper", () => {
      const { container } = renderComponent({ bgColor: "#0099ff" });

      expect(getWrapper(container)).toHaveStyle({ backgroundColor: "#0099ff" });
    });

    it("should apply the active modifier when isActive is true", () => {
      const { container } = renderComponent({ isActive: true });

      expect(getWrapper(container)).toHaveClass("image-with-background-color-wrapper--active");
    });

    it("should apply the pointer modifier when onClick is provided", () => {
      const { container } = renderComponent({ onClick: jest.fn() });

      expect(getWrapper(container)).toHaveClass("image-with-background-color-wrapper--pointer");
    });

    it("should not apply the pointer modifier when onClick is omitted", () => {
      const { container } = renderComponent();

      expect(getWrapper(container)).not.toHaveClass("image-with-background-color-wrapper--pointer");
    });
  });

  describe("behavior", () => {
    it("should call onClick when the wrapper is clicked", async () => {
      const user = userEvent.setup();
      const mockOnClick = jest.fn();
      const { container } = renderComponent({ onClick: mockOnClick });

      await user.click(getWrapper(container));

      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });
  });
});
