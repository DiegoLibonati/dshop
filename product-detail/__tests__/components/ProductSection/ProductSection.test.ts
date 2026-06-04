import { render, waitFor } from "@testing-library/vue";

import type { RenderResult } from "@testing-library/vue";

import ProductSection from "@product-detail/components/ProductSection/ProductSection.vue";

import { PRODUCT_CONTEXT_KEY } from "@product-detail/constants/keys";

import { mockProduct } from "@tests/__mocks__/product.mock";
import {
  ImageWithBackgroundColorModule,
  InformationItemClothesModule,
} from "@tests/__mocks__/sharedCoreSdk.mock";

const renderComponent = (): RenderResult =>
  render(ProductSection, {
    global: { provide: { [PRODUCT_CONTEXT_KEY]: mockProduct } },
  });

describe("ProductSection", () => {
  describe("rendering", () => {
    it("should render the product section container", () => {
      const { container } = renderComponent();

      expect(container.querySelector<HTMLElement>(".product-section")).toBeInTheDocument();
    });

    it("should render the image viewer for the product images", async () => {
      renderComponent();

      await waitFor(() =>
        expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalledTimes(
          mockProduct.images.length + 1
        )
      );
    });

    it("should render the product information with the product name", async () => {
      renderComponent();

      await waitFor(() => expect(InformationItemClothesModule.mount).toHaveBeenCalled());
      expect(InformationItemClothesModule.mount).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ name: mockProduct.name }),
        expect.anything()
      );
    });
  });
});
