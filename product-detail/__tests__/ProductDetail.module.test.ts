import { waitFor } from "@testing-library/vue";

import type { Product } from "shared-core/sdk";
import type { GalleryClothesProps } from "shared-react/sdk";
import type { ProductDetailMfeMountOptions } from "@product-detail/types/mfe";

import { mount, unmount } from "@product-detail/ProductDetail.module";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import { mockClothes } from "@tests/__mocks__/clothes.mock";
import { mockProduct } from "@tests/__mocks__/product.mock";
import { GalleryClothesModule } from "@tests/__mocks__/sharedReactSdk.mock";
import { ImageWithBackgroundColorModule } from "@tests/__mocks__/sharedCoreSdk.mock";

let container: HTMLDivElement;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmount(container);
  container.remove();
});

const buildOptions = (
  overrides: Partial<ProductDetailMfeMountOptions> = {}
): ProductDetailMfeMountOptions => ({
  product: mockProduct,
  clothesAlsoLike: mockClothes,
  callbacks: mockCallbacks,
  ...overrides,
});

describe("ProductDetail.module", () => {
  describe("mount", () => {
    it("should tag the container with the product detail mfe dataset", () => {
      mount(container, buildOptions());

      expect(container.dataset.mfe).toBe("product-detail");
    });

    it("should render the product detail page into the container", async () => {
      mount(container, buildOptions());

      await waitFor(() =>
        expect(container.querySelector<HTMLElement>(".main-product-detail")).toBeInTheDocument()
      );
      await waitFor(() => expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalled());
    });

    it("should provide the callbacks so the gallery can navigate", async () => {
      mount(container, buildOptions());

      await waitFor(() => expect(GalleryClothesModule.mount).toHaveBeenCalled());
      const galleryProps = GalleryClothesModule.mount.mock.calls[0]![1] as GalleryClothesProps;
      galleryProps.onClothesClick(mockClothes[0]!);

      expect(mockCallbacks.onNavigate).toHaveBeenCalledWith(`/product/${mockClothes[0]!.id}`);
    });

    it("should unmount a previous app when mounting again on the same container", async () => {
      mount(container, buildOptions());
      await waitFor(() => expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalled());

      mount(container, buildOptions());

      await waitFor(() => expect(ImageWithBackgroundColorModule.unmount).toHaveBeenCalled());
    });

    it("should report errors through the onError callback when a child fails to render", async () => {
      const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);
      const onError = vi.fn();
      const brokenProduct = { ...mockProduct, reviews: undefined } as unknown as Product;

      mount(container, buildOptions({ product: brokenProduct, onError }));

      await waitFor(() => expect(onError).toHaveBeenCalledWith(expect.any(Error)));
      consoleErrorSpy.mockRestore();
    });
  });

  describe("unmount", () => {
    it("should remove the rendered content and unmount the shared modules", async () => {
      mount(container, buildOptions());
      await waitFor(() => expect(ImageWithBackgroundColorModule.mount).toHaveBeenCalled());

      unmount(container);

      await waitFor(() =>
        expect(container.querySelector<HTMLElement>(".main-product-detail")).not.toBeInTheDocument()
      );
      expect(ImageWithBackgroundColorModule.unmount).toHaveBeenCalled();
    });

    it("should be a no-op when unmounting an unknown container", () => {
      const unknownContainer = document.createElement("div");

      expect(() => unmount(unknownContainer)).not.toThrow();
    });
  });
});
