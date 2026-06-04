import { render } from "@testing-library/react";

import type { RenderResult } from "@testing-library/react";
import type { SkeletonShimmerProps } from "@shared-core/types/props";

import SkeletonShimmer from "@shared-core/components/Skeletons/SkeletonShimmer/SkeletonShimmer";

const renderComponent = (props: Partial<SkeletonShimmerProps> = {}): RenderResult =>
  render(<SkeletonShimmer {...props} />);

describe("SkeletonShimmer", () => {
  describe("rendering", () => {
    it("should render with the base skeleton-shimmer class", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).toBeInTheDocument();
    });

    it("should apply the rounded modifier when rounded is true", () => {
      const { container } = renderComponent({ rounded: true });

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).toHaveClass(
        "skeleton-shimmer--rounded"
      );
    });

    it("should not apply the rounded modifier when rounded is false", () => {
      const { container } = renderComponent({ rounded: false });

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).not.toHaveClass(
        "skeleton-shimmer--rounded"
      );
    });

    it("should apply the provided className", () => {
      const { container } = renderComponent({ className: "skeleton-shimmer--card" });

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).toHaveClass(
        "skeleton-shimmer--card"
      );
    });
  });
});
