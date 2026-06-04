import { render, waitFor } from "@testing-library/vue";

import type { RenderResult } from "@testing-library/vue";
import type { GalleryClothesProps } from "shared-react/sdk";

import YouMightAlsoLikeSection from "@product-detail/components/YouMightAlsoLikeSection/YouMightAlsoLikeSection.vue";

import { CLOTHES_ALSO_LIKE_CONTEXT_KEY } from "@product-detail/constants/keys";
import { lang } from "@product-detail/constants/lang";

import { mockCallbacks } from "@tests/__mocks__/callbacks.mock";
import { mockClothes } from "@tests/__mocks__/clothes.mock";
import { GalleryClothesModule } from "@tests/__mocks__/sharedReactSdk.mock";

const renderComponent = (provide: Record<string, unknown> = {}): RenderResult =>
  render(YouMightAlsoLikeSection, {
    global: {
      provide: { [CLOTHES_ALSO_LIKE_CONTEXT_KEY]: mockClothes, ...provide },
    },
  });

describe("YouMightAlsoLikeSection", () => {
  describe("rendering", () => {
    it("should mount the gallery with the injected clothes and the section title", async () => {
      renderComponent();

      await waitFor(() => expect(GalleryClothesModule.mount).toHaveBeenCalled());
      expect(GalleryClothesModule.mount).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          title: lang.en.youMightAlsoLike.title,
          clothes: mockClothes,
        }),
        expect.anything()
      );
    });
  });

  describe("behavior", () => {
    it("should navigate to the product when a clothes item is clicked", async () => {
      renderComponent({ mfeCallbacks: mockCallbacks });

      await waitFor(() => expect(GalleryClothesModule.mount).toHaveBeenCalled());
      const galleryProps = GalleryClothesModule.mount.mock.calls[0]![1] as GalleryClothesProps;
      galleryProps.onClothesClick(mockClothes[0]!);

      expect(mockCallbacks.onNavigate).toHaveBeenCalledWith(`/product/${mockClothes[0]!.id}`);
    });

    it("should not throw when no callbacks are available", async () => {
      renderComponent();

      await waitFor(() => expect(GalleryClothesModule.mount).toHaveBeenCalled());
      const galleryProps = GalleryClothesModule.mount.mock.calls[0]![1] as GalleryClothesProps;

      expect(() => galleryProps.onClothesClick(mockClothes[0]!)).not.toThrow();
    });
  });
});
