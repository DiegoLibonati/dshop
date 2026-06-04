import { render } from "@testing-library/vue";

import type { RenderResult } from "@testing-library/vue";
import type { SkeletonShimmerProps } from "shared-core/sdk";

import SkeletonShimmer from "@product-detail/components/SkeletonShimmer/SkeletonShimmer.vue";

const renderComponent = (
  props: SkeletonShimmerProps & { loadingClass?: string } = {}
): RenderResult => render(SkeletonShimmer, { props });

describe("SkeletonShimmer", () => {
  describe("rendering", () => {
    it("should render the base skeleton element", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).toBeInTheDocument();
    });

    it("should apply the provided loading class", () => {
      const { container } = renderComponent({ loadingClass: "custom-loader" });

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).toHaveClass(
        "custom-loader"
      );
    });

    it("should apply the rounded modifier when rounded is true", () => {
      const { container } = renderComponent({ rounded: true });

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).toHaveClass(
        "skeleton-shimmer--rounded"
      );
    });

    it("should not apply the rounded modifier by default", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLDivElement>(".skeleton-shimmer")).not.toHaveClass(
        "skeleton-shimmer--rounded"
      );
    });
  });
});
