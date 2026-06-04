import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { LoaderCircularProps } from "@shared-core/types/props";

import LoaderCircular from "@shared-core/components/Loaders/LoaderCircular/LoaderCircular";

const renderComponent = (props: Partial<LoaderCircularProps> = {}): RenderResult =>
  render(<LoaderCircular {...props} />);

describe("LoaderCircular", () => {
  describe("rendering", () => {
    it("should render the loader element", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
    });

    it("should apply the provided className", () => {
      const { container } = renderComponent({ className: "loader--small" });

      expect(container.querySelector<HTMLDivElement>(".loader")).toHaveClass("loader--small");
    });
  });
});
