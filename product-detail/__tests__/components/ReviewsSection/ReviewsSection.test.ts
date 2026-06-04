import { render, screen, waitFor } from "@testing-library/vue";

import type { RenderResult } from "@testing-library/vue";
import type { Product, Review } from "shared-core/sdk";

import ReviewsSection from "@product-detail/components/ReviewsSection/ReviewsSection.vue";

import { PRODUCT_CONTEXT_KEY } from "@product-detail/constants/keys";

import { mockProduct } from "@tests/__mocks__/product.mock";
import { ReviewCustomerModule } from "@tests/__mocks__/sharedAngularSdk.mock";

const buildReviews = (count: number): Review[] =>
  Array.from({ length: count }, (_, index) => ({
    id: `rev-${index + 1}`,
    name: `Reviewer ${index + 1}`,
    description: `Review number ${index + 1}`,
    value: 4,
  }));

const renderComponent = (product: Product = mockProduct): RenderResult =>
  render(ReviewsSection, {
    global: { provide: { [PRODUCT_CONTEXT_KEY]: product } },
  });

describe("ReviewsSection", () => {
  describe("rendering", () => {
    it("should render the reviews title with the review count", () => {
      renderComponent();

      const heading = screen.getByRole("heading", { level: 2 });
      expect(heading).toHaveTextContent("All Reviews");
      expect(heading).toHaveTextContent(`(${mockProduct.reviews.length})`);
    });

    it("should mount a review for each review", async () => {
      renderComponent();

      await waitFor(() =>
        expect(ReviewCustomerModule.mount).toHaveBeenCalledTimes(mockProduct.reviews.length)
      );
    });

    it("should pass the review details to each review", async () => {
      renderComponent();

      await waitFor(() => expect(ReviewCustomerModule.mount).toHaveBeenCalled());
      const firstReview = mockProduct.reviews[0]!;
      expect(ReviewCustomerModule.mount).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          name: firstReview.name,
          description: firstReview.description,
          maxStars: 5,
          valueStars: firstReview.value,
        }),
        expect.anything()
      );
    });
  });

  describe("edge cases", () => {
    it("should limit the rendered reviews to six", async () => {
      renderComponent({ ...mockProduct, reviews: buildReviews(8) });

      await waitFor(() => expect(ReviewCustomerModule.mount).toHaveBeenCalledTimes(6));
    });

    it("should not render the section when there are no reviews", () => {
      renderComponent({ ...mockProduct, reviews: [] });

      expect(screen.queryByRole("heading", { level: 2 })).not.toBeInTheDocument();
      expect(ReviewCustomerModule.mount).not.toHaveBeenCalled();
    });
  });
});
