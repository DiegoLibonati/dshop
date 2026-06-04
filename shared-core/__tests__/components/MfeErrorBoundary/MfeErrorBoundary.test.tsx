import { render, screen } from "@testing-library/react";

import type { JSX } from "react";
import type { RenderResult } from "@testing-library/react";
import type { MfeErrorBoundaryProps } from "@shared-core/types/props";

import MfeErrorBoundary from "@shared-core/components/MfeErrorBoundary/MfeErrorBoundary";

const ThrowingChild = (): JSX.Element => {
  throw new Error("child failure");
};

const renderComponent = (props: Partial<MfeErrorBoundaryProps> = {}): RenderResult => {
  const defaultProps: MfeErrorBoundaryProps = {
    children: <p>safe content</p>,
    ...props,
  };

  return render(<MfeErrorBoundary {...defaultProps} />);
};

describe("MfeErrorBoundary", () => {
  describe("rendering", () => {
    it("should render its children when no error is thrown", () => {
      renderComponent();

      expect(screen.getByText("safe content")).toBeInTheDocument();
    });
  });

  describe("error handling", () => {
    it("should render nothing and call onError when a child throws", () => {
      const mockOnError = jest.fn();
      jest.spyOn(console, "error").mockReturnValue(undefined);
      const { container } = renderComponent({
        children: <ThrowingChild />,
        onError: mockOnError,
      });

      expect(container).toBeEmptyDOMElement();
      expect(mockOnError).toHaveBeenCalledWith(expect.any(Error));
    });

    it("should render nothing when a child throws and no onError handler is provided", () => {
      jest.spyOn(console, "error").mockReturnValue(undefined);
      const { container } = renderComponent({ children: <ThrowingChild /> });

      expect(container).toBeEmptyDOMElement();
    });
  });
});
