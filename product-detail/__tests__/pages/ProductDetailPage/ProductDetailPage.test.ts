import { render, waitFor } from "@testing-library/vue";

import type { RenderResult } from "@testing-library/vue";
import type { ProductDetailPageProps } from "@product-detail/types/props";

import ProductDetailPage from "@product-detail/pages/ProductDetailPage/ProductDetailPage.vue";

import { mockClothes } from "@tests/__mocks__/clothes.mock";
import { mockProduct } from "@tests/__mocks__/product.mock";
import { GalleryClothesModule } from "@tests/__mocks__/sharedReactSdk.mock";
import { ImageWithBackgroundColorModule } from "@tests/__mocks__/sharedCoreSdk.mock";
import { ReviewCustomerModule } from "@tests/__mocks__/sharedAngularSdk.mock";

const renderPage = (props: Partial<ProductDetailPageProps> = {}): RenderResult =>
  render(ProductDetailPage, {
    props: { product: mockProduct, clothesAlsoLike: mockClothes, ...props },
  });

describe("ProductDetailPage", () => {
  describe("rendering", () => {
    it("should render the main product detail container", () => {
      const { container } = renderPage();

      expect(container.querySelector<HTMLElement>(".main-product-detail")).toBeInTheDocument();
    });

    it("should provide the product to its product and reviews sections", async () => {
      renderPage();

      await waitFor(() => expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalled());
      await waitFor(() => expect(ReviewCustomerModule.mount).toHaveBeenCalled());
    });

    it("should provide the clothes to the gallery section", async () => {
      renderPage();

      await waitFor(() => expect(GalleryClothesModule.mount).toHaveBeenCalled());
      expect(GalleryClothesModule.mount).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ clothes: mockClothes }),
        expect.anything()
      );
    });
  });

  describe("edge cases", () => {
    it("should not render reviews when the product has none", async () => {
      renderPage({ product: { ...mockProduct, reviews: [] } });

      await waitFor(() => expect(GalleryClothesModule.mount).toHaveBeenCalled());
      expect(ReviewCustomerModule.mount).not.toHaveBeenCalled();
    });
  });
});
