import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { LoaderScreenProps } from "@shared-react/types/props";

import LoaderScreen from "@shared-react/components/Loaders/LoaderScreen/LoaderScreen";

const renderComponent = (props: Partial<LoaderScreenProps> = {}): RenderResult =>
  render(<LoaderScreen {...props} />);

describe("LoaderScreen", () => {
  describe("rendering", () => {
    it("should render the loader screen container", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".loader-screen")).toBeInTheDocument();
    });

    it("should apply the provided className to the container", () => {
      const { container } = renderComponent({ className: "fullscreen-loader" });

      expect(container.querySelector<HTMLDivElement>(".loader-screen")).toHaveClass(
        "fullscreen-loader"
      );
    });

    it("should render the loader inside a shared-core mfe wrapper", () => {
      const { container } = renderComponent();

      const mfeWrapper = container.querySelector<HTMLDivElement>("[data-mfe='shared-core']");

      expect(mfeWrapper).toBeInTheDocument();
      expect(mfeWrapper?.querySelector<HTMLDivElement>(".loader")).toBeInTheDocument();
    });
  });
});
